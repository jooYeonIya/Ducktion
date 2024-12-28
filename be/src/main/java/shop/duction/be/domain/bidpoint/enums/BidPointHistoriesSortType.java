package shop.duction.be.domain.bidpoint.enums;

import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;

public enum BidPointHistoriesSortType {
  ALL, // BidPointType 전부
  PLUS, // BidPointType CHARGE, CANCELLATION_BID, EARNING_BID
  MINUS; // BidPointType BIDDED, WITHDRAWAL

  public List<String> getBidPointHistoriesString() {
    return switch (this) {
      case ALL -> Arrays.stream(BidPointType.values()).map(Enum::name).toList();
      case PLUS -> BidPointType.getPlusTypes().stream().map(Enum::name).toList();
      case MINUS -> BidPointType.getMinusTypes().stream().map(Enum::name).toList();
    };
  }
}
