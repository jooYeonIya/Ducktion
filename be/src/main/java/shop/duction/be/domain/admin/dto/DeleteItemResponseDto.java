package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteItemResponseDto {
  private String itemName;
  private String nickname;
  private String title;
  private String requestReason;
  private String requestTime;
}
