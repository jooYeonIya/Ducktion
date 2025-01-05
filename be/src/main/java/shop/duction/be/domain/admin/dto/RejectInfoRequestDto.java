package shop.duction.be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RejectInfoRequestDto {
  private Integer requestId;
  private String title;
  private String rejectReason;
  private String email;
}
