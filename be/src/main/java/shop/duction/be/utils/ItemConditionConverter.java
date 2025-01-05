package shop.duction.be.utils;

import shop.duction.be.domain.item.enums.ItemCondition;
import shop.duction.be.domain.item.enums.RareTier;

public class ItemConditionConverter {
  public static String convert(ItemCondition itemCondition) {
    return switch (itemCondition) {
      case NEW -> "새상품";
      case NO_USE -> "사용감 없음";
      case LESS_USE -> "사용감 적음";
      case MANY_USE -> "사용감 많음";
      default -> "고장/파손";
    };
  }
}
