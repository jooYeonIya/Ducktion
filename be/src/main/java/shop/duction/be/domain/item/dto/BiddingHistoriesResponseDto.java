package shop.duction.be.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BiddingHistoriesResponseDto {
  private Info info;
  private List<History> histories;

  @Data
  @AllArgsConstructor
  public static class Info {
    private Integer communityId;
    private Integer itemId;
    private String name;
    private String image;
    private Integer biddingCount;
    private String rareTier;
    private Integer userId; // 출품자
    private boolean favorite;
  }

  @Data
  @AllArgsConstructor
  public static class History {
    private String date;
    private String price;
  }
}