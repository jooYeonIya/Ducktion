package shop.duction.be.utils;

import shop.duction.be.domain.item.enums.RareTier;
public class RareTierCheck {
  public static RareTier rareCheck(float score) {
    final float EPSILON = 0.00001f; // 허용 오차

    if (score < 0 || score > 5) {
      throw new IllegalArgumentException("Score must be between 0 and 5");
    }
    if (score < 0.5 + EPSILON) {
      return RareTier.NORMAL;
    } else if (score < 1.0 + EPSILON) {
      return RareTier.NORMAL_RARE;
    } else if (score < 1.5 + EPSILON) {
      return RareTier.RARE;
    } else if (score < 2.0 + EPSILON) {
      return RareTier.SUPER_RARE;
    } else if (score < 2.5 + EPSILON) {
      return RareTier.ULTRA_RARE;
    } else if (score < 3.0 + EPSILON) {
      return RareTier.ULTIMATE_RARE;
    } else if (score < 3.5 + EPSILON) {
      return RareTier.SECRET_RARE;
    } else if (score < 4.0 + EPSILON) {
      return RareTier.PARALLEL_RARE;
    } else if (score < 4.5 + EPSILON) {
      return RareTier.COLLECTORS_RARE;
    } else {
      return RareTier.MASTER_COLLECTORS_RARE;
    }
  }

}
