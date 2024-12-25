package shop.duction.be.domain.bidpoint.enums;

public enum BidpointType {
    CHARGE, // 충전
    BIDDED, // 낙찰
    CANCELLATION_BID,   // 낙찰 취소로 인한 환급
    WITHDRAWAL, // 현금화
    EARNING_BID // 출품 상품 판매 수익
}
