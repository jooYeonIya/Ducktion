package shop.duction.be.domain.ship.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.ship.dto.ShipRequestDto;
import shop.duction.be.domain.ship.dto.ShipInfoResponseDto;
import shop.duction.be.domain.ship.entity.BidderShip;
import shop.duction.be.domain.ship.entity.ExhibitorShip;
import shop.duction.be.domain.ship.enums.DeliveryId;
import shop.duction.be.domain.ship.repository.BidderShipRepository;
import shop.duction.be.domain.ship.repository.ExhibitorShipRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.utils.DateTimeUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class ShipService {
  private final ItemRepository itemRepository;
  private final UserRepository userRepository;
  private final BidderShipRepository bidderShipRepository;
  private final ExhibitorShipRepository exhibitorShipRepository;

  public ShipInfoResponseDto getBiddershipInvoice(Integer itemId) {
    BidderShip bidderShip = bidderShipRepository.findByItem_ItemId(itemId);
    return new ShipInfoResponseDto(bidderShip.getDeliveryId().toString(), bidderShip.getPostNumber());
  }

  public String getShippingDeadline(Integer itemId, Integer userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    if ("ADMIN".equals(user.getRole())) {
      return "ADMIN";
    }

    return itemRepository.findById(itemId)
            .map(item -> DateTimeUtils.yearDateTimeFormatter.format(
                    item.getEndBidTime().plusDays(3)))
            .orElseThrow(() -> new IllegalArgumentException("아이템을 찾을 수 없습니다."));
  }

  public ResponseEntity<String> postExhibitorShipInvoice(ShipRequestDto request, Integer userId) {
    int existingShipInfo = exhibitorShipRepository.countByUserIdAndItemId(userId, request.getItemId());
    if (existingShipInfo > 0) {
      throw new IllegalStateException("배송 번호 입력되어 있습니다");
    }

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    Item item = itemRepository.findById(request.getItemId())
            .orElseThrow(() -> new IllegalArgumentException("아이템을 찾을 수 없습니다."));

    ExhibitorShip exhibitorShip = new ExhibitorShip();
    DeliveryId deliveryId = DeliveryId.valueOf(request.getDeliveryId());
    exhibitorShip.setDeliveryId(deliveryId);
    exhibitorShip.setPostNumber(request.getPostNumber());
    exhibitorShip.setUser(user);
    exhibitorShip.setItem(item);

    exhibitorShipRepository.save(exhibitorShip);

    return ResponseEntity.ok("배송 번호 입력 완료");
  }
}
