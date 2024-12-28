package shop.duction.be.utils;

import java.time.format.DateTimeFormatter;

public class DateTimeFormatterUtil {

  static public DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("MM월 dd일");
  static public DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

}
