package shop.duction.be.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateTimeUtils {

  public static DateTimeFormatter yearDateTimeFormatter = DateTimeFormatter.ofPattern("YYYY년 MM월 dd일");
  public static DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("MM월 dd일");
  public static DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
  public static LocalDateTime getStartOfMonth(String year, String month) {
    try {
      return LocalDateTime.of(
              Integer.parseInt(year),
              Integer.parseInt(month),
              1, 0, 0);
    } catch (NumberFormatException | DateTimeParseException e) {
      throw new IllegalArgumentException("올바르지 않은 연도 또는 월입니다: " + year + ", " + month, e);
    }
  }

  public static LocalDateTime getEndOfMonth(String year, String month) {
    LocalDateTime startDay = getStartOfMonth(year, month);
    return startDay.withDayOfMonth(startDay.toLocalDate().lengthOfMonth())
            .withHour(23)
            .withMinute(59)
            .withSecond(59);
  }
}
