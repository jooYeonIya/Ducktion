package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteItemResponseDto {
  private Integer itemId;
  private String itemName;
  private Integer requestId;
  private String nickname;
  private String email;
  private String title;
  private String requestReason;
  private String requestTime;
}
