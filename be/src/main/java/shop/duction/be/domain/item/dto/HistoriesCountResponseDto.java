package shop.duction.be.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoriesCountResponseDto {

  private ExhibitDetails exhibit;
  private BiddingDetails bidding;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ExhibitDetails {
    private Long all; // 전체
    private Long biddingUnder; // 입찰중
    private Long bidded; // 낙찰
    private Long biddedNot; // 유찰
    private Long biddedCancel; // 낙찰 취소
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class BiddingDetails {
    private Long all;
    private Long bidding;
    private Long bidded;
    private Long biddedFail;
  }
}
