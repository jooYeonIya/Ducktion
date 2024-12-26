package shop.duction.be.domain.bidpoint.enums;

import java.util.List;

public enum BidPointType {
  CHARGE, // 충전
  BIDDED, // 낙찰
  CANCELLATION_BID,   // 낙찰 취소로 인한 환급
  WITHDRAWAL, // 현금화
  EARNING_BID; // 출품 상품 판매 수익

  public static List<BidPointType> getPlusTypes() {
    return List.of(CHARGE, CANCELLATION_BID, EARNING_BID);
  }

  public static List<BidPointType> getMinusTypes() {
    return List.of(BIDDED, WITHDRAWAL);
  }

  public static String getDefaultNameBasedOnType(BidPointType type) {
    return switch (type) {
      case CHARGE -> "비드 충전";
      case WITHDRAWAL -> "현금화";
      case EARNING_BID -> "낙찰 비드 적립";
      case CANCELLATION_BID -> "낙찰 비드 적립";
      case BIDDED -> "낙찰 비드 차감";
      default -> "";
    };
  }

}
