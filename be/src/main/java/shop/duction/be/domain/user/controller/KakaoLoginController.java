package shop.duction.be.domain.user.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/login/oauth")
public class KakaoLoginController {

  private final String REST_API_KEY = "00984eb13f890a76eef79a1b5d7974dd";
  private final String REDIRECT_URI = "http://localhost:8080/api/login/oauth/redirect";

  // 로그인 화면으로 이동할 수 있도록 url 반환
  @GetMapping
  public String getLoginUrl() {
    String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" +
            REST_API_KEY + "&redirect_uri=" + REDIRECT_URI + "&response_type=code";
    return kakaoAuthUrl;
  }

  // 로그인 성공 실패를 카카오가 리다이렉트 해줌
  @GetMapping("/redirect")
  public void handleKakaoAuth(@RequestParam String code, HttpServletResponse response) throws IOException {
    try {
      Map<String, String> tokens = requestTokens(code);
      Map<String, Object> userInfo = requestUserInfo(tokens.get("access_token"));
      saveUserInfo(userInfo);

      String redirectUrl = "http://localhost:5173/resultOauth?access_token=" + tokens.get("access_token");
      response.sendRedirect(redirectUrl);
    } catch (Exception e) {
      String errorMessage = "로그인에 실패했습니다. 다시 시도해 주세요.";
      String errorRedirectUrl = "http://localhost:5173/resultOauth?error=" + errorMessage;
      response.sendRedirect(errorRedirectUrl);
    }
  }

  // 액세스 토큰, 리프레시 토큰 발급 요청
  private Map<String, String> requestTokens(String code) {
    String tokenUrl = "https://kauth.kakao.com/oauth/token";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", REST_API_KEY);
    params.add("redirect_uri", REDIRECT_URI);
    params.add("code", code);

    // 헤더와 파람으로 리퀘스트 생성
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

    Map<String, String> tokens = new HashMap<>();
    Map<String, String> body = response.getBody();
    tokens.put("access_token", body.get("access_token"));
    tokens.put("refresh_token", body.get("refresh_token"));
    return tokens;
  }

  // 액세스 토큰으로 사용자 정보를 요청
  private Map<String, Object> requestUserInfo(String accessToken) {
    String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);

    // 헤더만으로 리퀘스트 요청
    HttpEntity<Void> request = new HttpEntity<>(headers);
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, Map.class);
    return response.getBody();
  }

  private void saveUserInfo(Map<String, Object> userInfo) {
    log.info("userInfo, {}", userInfo);
  }
}
