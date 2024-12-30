package shop.duction.be.utils;

import shop.duction.be.domain.item.enums.RareTier;

public class RareTierCheckUtils {
  public static RareTier rareCheck(double score) {
    if (score < 0 || score > 5) {
      throw new IllegalArgumentException("Score must be between 0 and 5"); // 유효성 검사
    }

    if (score < 0.5) {
      return RareTier.NORMAL;
    } else if (score < 1.0) {
      return RareTier.NORMAL_RARE;
    } else if (score < 1.5) {
      return RareTier.RARE;
    } else if (score < 2.0) {
      return RareTier.SUPER_RARE;
    } else if (score < 2.5) {
      return RareTier.ULTRA_RARE;
    } else if (score < 3.0) {
      return RareTier.ULTIMATE_RARE;
    } else if (score < 3.5) {
      return RareTier.SECRET_RARE;
    } else if (score < 4.0) {
      return RareTier.PARALLEL_RARE;
    } else if (score < 4.5) {
      return RareTier.COLLECTORS_RARE;
    } else {
      return RareTier.MASTER_COLLECTORS_RARE;
    }
  }
}
