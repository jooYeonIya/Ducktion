package shop.duction.be.security;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.user.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
  @Value("${KAKAO_TEST_CLIENT_ID}")
  private String clientId;

  @Value("${KAKAO_REDIRECT_URI}")
  private String redirectUri;

  private final KakaoOAuthService kakaoOAuthService;
  private final UserRepository userRepository;

  @GetMapping("/kakao/url")
  public ResponseEntity<Map<String, String>> getKakaoAuthUrl() {
    String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + clientId +
            "&redirect_uri=" + redirectUri +
            "&response_type=code";

    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON); // JSON 형식으로 응답

    return ResponseEntity.ok()
            .headers(headers)
            .body(Map.of("url", kakaoAuthUrl));
  }

  @GetMapping("/kakao/callback")
  public ResponseEntity<Void> handleKakaoCallback(@RequestParam String code) {

    return kakaoOAuthService.authenticateWithKakao(code);
  }

   //Refresh Token을 이용한 Access Token 재발행
  @PostMapping("/refresh")
  public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokenRequest) {
    String refreshToken = tokenRequest.get("refresh_token");
    Map<String, String> tokens = kakaoOAuthService.refreshAccessToken(refreshToken);

    return ResponseEntity.ok(tokens);
  }
}
