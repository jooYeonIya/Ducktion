package shop.duction.be.security;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.enums.IsActive;
import shop.duction.be.domain.user.enums.Role;
import shop.duction.be.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoOAuthService {
  private final UserRepository userRepository;
  private final JwtProvider jwtProvider;

  @Value("${KAKAO_TOKEN_URI}") // .env에서 카카오 토큰 URL 가져오기
  private String kakaoTokenUrl;

  @Value("${KAKAO_USER_INFO_URI}") // .env에서 카카오 사용자 정보 URL 가져오기
  private String kakaoUserInfoUrl;

  @Value("${KAKAO_CLIENT_ID}") // .env에서 클라이언트 ID 가져오기
  private String clientId;

  @Value("${KAKAO_REDIRECT_URI}") // .env에서 리다이렉트 URI 가져오기
  private String redirectUri;

  // 카카오 인증코드를 이용한 JWT 발급
  public Map<String, String> authenticateWithKakao(String authorizationCode) {
    // 1. 카카오 액세스 토큰 요청
    String kakaoAccessToken = getAccessToken(authorizationCode);

    // 2. 카카오 사용자 정보 요청
    KakaoUser kakaoUser = getUserInfo(kakaoAccessToken);

    // 3. 사용자 정보 기반으로 자체 User 엔티티 확인 또는 저장
    User user = userRepository.findByEmail(kakaoUser.getKakaoAccount().getEmail())
            .orElseGet(() -> saveUserFromKakao(kakaoUser));

    // 4. JWT 생성
    String accessToken = jwtProvider.generateAccessToken(user);
    String refreshToken = jwtProvider.generateRefreshToken(user);

    // 5. JWT와 사용자 정보 반환
    return Map.of(
            "access_token", accessToken,
            "refresh_token", refreshToken,
            "user_email", user.getEmail(),
            "user_nickname", user.getNickname(),
            "user_role", user.getRole().name()
    );
  }

  // 카카오 토큰 요청
  public String getAccessToken(String authorizationCode) {
    RestTemplate restTemplate = new RestTemplate();

    // 카카오 토큰 요청을 위한 HTTP 헤더와 본문 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    String body = String.format(
            "grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s",
            clientId, redirectUri, authorizationCode
    );

    HttpEntity<String> request = new HttpEntity<>(body, headers);

    // 카카오 서버로부터 액세스 토큰 요청
    ResponseEntity<Map> response = restTemplate.postForEntity(kakaoTokenUrl, request, Map.class);
    if (response.getStatusCode() == HttpStatus.OK) {
      return (String) response.getBody().get("access_token");
    }
    throw new RuntimeException("카카오 액세스 토큰을 가져올 수 없습니다.");
  }

  // 카카오 사용자 정보 요청
  public KakaoUser getUserInfo(String kakaoAccessToken) {
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(kakaoAccessToken);
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<String> request = new HttpEntity<>(headers);

    ResponseEntity<KakaoUser> response = restTemplate.exchange(
            kakaoUserInfoUrl, HttpMethod.GET, request, KakaoUser.class
    );

    if (response.getStatusCode() == HttpStatus.OK) {
      return response.getBody();
    }
    throw new RuntimeException("카카오 사용자 정보를 가져올 수 없습니다.");
  }

  // 카카오 사용자 정보를 기반으로 자체 User 엔티티 생성 및 저장.
  public User saveUserFromKakao(KakaoUser kakaoUser) {
    return userRepository.save(User.builder()
            .email(kakaoUser.getKakaoAccount().getEmail())
            .nickname(kakaoUser.getKakaoAccount().getProfile().getNickName())
            .phone(kakaoUser.getKakaoAccount().getPhoneNumber())
            .isActive(IsActive.ACTIVE)
            .role(Role.USER)
            .heldBid(0)
            .usableBid(0)
            .rate(50f)
            .penaltyCount(0)
            .registTime(LocalDateTime.now())
            .build());
  }

  // Refresh Token을 이용한 JWT Access Token 재발행
  public Map<String, String> refreshAccessToken(String refreshToken) {
    // 1. Refresh Token 검증
    if (jwtProvider.validateToken(refreshToken)) {
      String email = jwtProvider.getEmailFromToken(refreshToken); // Refresh Token에서 이메일 추출
      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

      // 2. 새로운 Access Token 발급
      String newAccessToken = jwtProvider.generateAccessToken(user);

      // 3. 새로운 Access Token 반환
      return Map.of("access_token", newAccessToken);
    }

    throw new RuntimeException("Invalid Refresh Token");
  }
}