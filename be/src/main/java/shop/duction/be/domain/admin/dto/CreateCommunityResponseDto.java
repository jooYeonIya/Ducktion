package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommunityResponseDto {
  private String nickname;
  private String email;
  private Integer requestId;
  private String title;
  private String requestReason;
  private String requestTime;
}
