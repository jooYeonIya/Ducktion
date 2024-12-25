package shop.duction.be.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
  private boolean overlayText;
  private boolean isFavorite;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class PriceInfo {
    private int price;
    private String type;
  }
}


