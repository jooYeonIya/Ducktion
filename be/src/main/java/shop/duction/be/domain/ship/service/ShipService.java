package shop.duction.be.domain.ship.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.ship.dto.ShipInfoResponseDto;
import shop.duction.be.domain.ship.entity.BidderShip;
import shop.duction.be.domain.ship.repository.BidderShipRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.utils.DateTimeUtils;

import java.time.temporal.ChronoUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class ShipService {
  private final ItemRepository itemRepository;
  private final UserRepository userRepository;
  private final BidderShipRepository bidderShipRepository;

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
}
