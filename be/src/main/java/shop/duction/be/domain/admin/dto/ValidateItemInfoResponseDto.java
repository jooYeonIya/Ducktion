package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidateItemInfoResponseDto {
  private Integer itemId;
  private String itemName;
  private String bidEndTime;
}
