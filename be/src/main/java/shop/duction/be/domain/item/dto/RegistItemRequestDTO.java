package shop.duction.be.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistItemRequestDTO {
  private String name;
  private String description;
  private String itemCondition;
  private Float rareScore;
  private Integer startingBid;
  private LocalDateTime endTime;
  private Integer immediateBid;
  private Integer communityId;
}
