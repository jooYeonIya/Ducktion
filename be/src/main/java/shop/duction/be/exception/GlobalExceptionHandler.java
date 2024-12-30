package shop.duction.be.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 전역 예외 처리 클래스
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  // ItemNotFoundException 처리
  @ExceptionHandler(ItemNotFoundException.class)
  public ResponseEntity<String> handleItemNotFoundException(ItemNotFoundException ex) {
    return ResponseEntity.status(ex.getStatus())
            .body(ex.getMessage());
  }

  // 기타 예외 처리
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleGenericException(Exception ex) {
    return ResponseEntity.status(500)
            .body("An unexpected error occurred: " + ex.getMessage());
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<String> handleIllegalStateException(IllegalStateException ex) {
    return ResponseEntity.badRequest().body(ex.getMessage());
  }
}
