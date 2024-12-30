package shop.duction.be.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserInfoRequestDto {
  private String nickname;
  private String phone;
  private String address;
}
