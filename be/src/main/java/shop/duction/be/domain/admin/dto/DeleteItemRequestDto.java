package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteItemRequestDto {
  private String title;
  private String requestReason;
  private Integer itemId;
}
