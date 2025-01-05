package shop.duction.be.utils;

import shop.duction.be.domain.item.enums.RareTier;

public class RareTierConverter {
  public static String convert(RareTier rareTier) {
    return switch (rareTier) {
      case NORMAL_RARE -> "노멀 레어";
      case RARE -> "레어";
      case SUPER_RARE -> "슈퍼 레어";
      case ULTRA_RARE -> "울트라 레어";
      case ULTIMATE_RARE -> "얼티밋 레어";
      case SECRET_RARE -> "시크릿 레어";
      case PARALLEL_RARE -> "패러렐 레어";
      case COLLECTORS_RARE -> "컬렉터즈 레어";
      case MASTER_COLLECTORS_RARE -> "마스터 컬렉터즈 레어";
      default -> "노멀";
    };
  }
}
