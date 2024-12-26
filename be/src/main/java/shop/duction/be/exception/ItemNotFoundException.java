package shop.duction.be.exception;

import org.springframework.http.HttpStatus;

/**
 * 상품(Item)이 존재하지 않을 때 발생하는 커스텀 예외.
 */
public class ItemNotFoundException extends RuntimeException {
  private final HttpStatus status;

  public ItemNotFoundException(String message) {
    super(message);
    this.status = HttpStatus.NOT_FOUND; // 기본적으로 404 상태코드
  }

  public ItemNotFoundException(String message, HttpStatus status) {
    super(message);
    this.status = status;
  }

  public HttpStatus getStatus() {
    return status;
  }
}
