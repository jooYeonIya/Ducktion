package shop.duction.be.domain.ship.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShipRequestDto {
  String deliveryId;
  String postNumber;
  Integer itemId;
}