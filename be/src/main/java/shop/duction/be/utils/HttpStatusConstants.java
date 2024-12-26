package shop.duction.be.utils;

import org.springframework.http.HttpStatus;

/**
 * HTTP 상태 코드를 재사용하기 위한 상수 클래스.
 * 프로젝트 전반에서 HTTP 상태 코드를 일관되게 정의하고 관리합니다.
 */
public final class HttpStatusConstants {

  private HttpStatusConstants() {
    // 객체 생성 방지
    throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
  }

  // 2xx 성공
  public static final HttpStatus OK = HttpStatus.OK; // 200
  public static final HttpStatus CREATED = HttpStatus.CREATED; // 201
  public static final HttpStatus NO_CONTENT = HttpStatus.NO_CONTENT; // 204

  // 4xx 클라이언트 에러
  public static final HttpStatus BAD_REQUEST = HttpStatus.BAD_REQUEST; // 400
  public static final HttpStatus UNAUTHORIZED = HttpStatus.UNAUTHORIZED; // 401
  public static final HttpStatus FORBIDDEN = HttpStatus.FORBIDDEN; // 403
  public static final HttpStatus NOT_FOUND = HttpStatus.NOT_FOUND; // 404
  public static final HttpStatus CONFLICT = HttpStatus.CONFLICT; // 409

  // 5xx 서버 에러
  public static final HttpStatus INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR; // 500
  public static final HttpStatus NOT_IMPLEMENTED = HttpStatus.NOT_IMPLEMENTED; // 501
}

