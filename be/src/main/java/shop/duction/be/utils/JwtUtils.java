package shop.duction.be.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtils {

  private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // HS256 키 생성

  // JWT 생성
  public String generateToken(String username) {
    return Jwts.builder()
            .claim("sub", username) // 사용자 이름 클레임 추가
            .issuedAt(new Date()) // 발급 시간
            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 만료 시간 1시간
            .signWith(secretKey)
            .compact();
  }

  // JWT 검증
  public boolean validateToken(String token) {
    try {
      Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(token);
      return true;
    } catch (Exception e) {
      return false; // 검증 실패 시 false 반환
    }
  }

  // JWT에서 사용자 이름 추출
  public String extractUsername(String token) {
    Claims claims = Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getBody();
    return claims.get("sub", String.class); // 사용자 이름 반환
  }
}
