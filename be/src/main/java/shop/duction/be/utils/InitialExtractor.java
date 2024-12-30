package shop.duction.be.utils;

public class InitialExtractor {
  private static final char HANGUL_BASE = 0xAC00; // 한글 유니코드 시작값
  private static final char HANGUL_END = 0xD7A3; // 한글 유니코드 끝값
  private static final char[] INITIALS = {
          'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  };

  public static String getFirstChar(String input) {
    if (input == null || input.isEmpty()) {
      return null;
    }

    char firstChar = input.charAt(0);

    // 한글 초성 추출
    if (firstChar >= HANGUL_BASE && firstChar <= HANGUL_END) {
      int index = (firstChar - HANGUL_BASE) / (21 * 28); // 초성 인덱스 계산
      return String.valueOf(INITIALS[index]);
    }

    // 영어 첫 글자 반환
    if (Character.isAlphabetic(firstChar)) {
      return String.valueOf(Character.toLowerCase(firstChar));
    }

    // 그 외 문자 처리
    return String.valueOf(firstChar);
  }
}
