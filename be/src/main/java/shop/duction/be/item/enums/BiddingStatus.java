package shop.duction.be.item.enums;

public enum BiddingStatus {
    BIDDING_BEFORE, // 입찰 전
    BIDDING_UNDER,  // 입찰중
    BIDDED, // 낙찰
    BIDDING_NOT,    // 유찰
    AUCTION_COMPLETE,   // 경매 종료
    BIDDED_CANCEL   // 낙찰 취소
}