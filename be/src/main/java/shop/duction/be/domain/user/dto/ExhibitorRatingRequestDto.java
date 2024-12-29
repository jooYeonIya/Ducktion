package shop.duction.be.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitorRatingRequestDto {
  private Integer exhibitorId;
  private Integer rating;
}
