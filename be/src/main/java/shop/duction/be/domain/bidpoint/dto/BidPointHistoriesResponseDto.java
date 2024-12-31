package shop.duction.be.domain.bidpoint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidPointHistoriesResponseDto {
  private String date;
  private String time;
  private String type;
  private Integer bidAmount;
  private Integer itemId;
  private String itemName;
}
