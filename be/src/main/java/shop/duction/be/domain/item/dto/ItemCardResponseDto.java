package shop.duction.be.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import shop.duction.be.domain.item.entity.Item;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCardResponseDto {
  private int itemId;
  private int communityId;
  private String name;
  private String image;
  private PriceInfo priceInfo;
  private String additionalInfo;
  private String overlayText;
  private boolean isFavorite;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class PriceInfo {
    private int price;
    private String type;
  }

  public static ItemCardResponseDto fromItem(Item item, boolean isFavorite) {
    return new ItemCardResponseDto(
            item.getItemId(),
            item.getCommunity().getCommunityId(),
            item.getName(),
            item.getItemImages().get(0).getUrl(),
            calculatePriceInfo(item),
            null,
            item.getAuctionStatus().getAuctionStatusMessage(),
            isFavorite);
  }

  private static PriceInfo calculatePriceInfo(Item item) {
    if (item.getImmediatePrice() != null) {
      return new PriceInfo(item.getImmediatePrice(), "즉시 낙찰가");
    } else if (item.getNowPrice() != null) {
      return new PriceInfo(item.getNowPrice(), "현재 입찰가");
    } else {
      return new PriceInfo(item.getStartPrice(), "시작가");
    }
  }
}


