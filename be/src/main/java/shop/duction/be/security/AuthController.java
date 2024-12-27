package shop.duction.be.security;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final KakaoOAuthService kakaoOAuthService;

  // 카카오 로그인 요청
  @PostMapping("/login")
  public ResponseEntity<?> loginWithKakao(@RequestBody Map<String, String> codeRequest) {
    // 카카오 인증 및 JWT 발급
    Map<String, String> tokens = kakaoOAuthService.authenticateWithKakao(codeRequest.get("code"));

    return ResponseEntity.ok(tokens);
  }

   //Refresh Token을 이용한 Access Token 재발행
  @PostMapping("/refresh")
  public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokenRequest) {
    String refreshToken = tokenRequest.get("refresh_token");
    Map<String, String> tokens = kakaoOAuthService.refreshAccessToken(refreshToken);

    return ResponseEntity.ok(tokens);
  }
}
