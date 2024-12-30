package shop.duction.be.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyInfoResponseDto {
  private String nickname;
  private String email;
  private Float rate;
  private Integer heldBid;
  private Integer usableBid;
  private String profileImage;
  private String phone;
  private String address;
}
