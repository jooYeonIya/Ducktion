package shop.duction.be.domain.bidpoint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBidPointResponse {
  private Integer heldBid;
  private Integer usableBid;
}
