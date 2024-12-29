package shop.duction.be.domain.ship.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.ship.dto.ShipInfoResponseDto;
import shop.duction.be.domain.ship.entity.BidderShip;
import shop.duction.be.domain.ship.repository.BidderShipRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ShipService {
  private final BidderShipRepository bidderShipRepository;

  public ShipInfoResponseDto getBiddershipInvoice(Integer itemId) {
    BidderShip bidderShip = bidderShipRepository.findByItem_ItemId(itemId);
    return new ShipInfoResponseDto(bidderShip.getDeliveryId().toString(), bidderShip.getPostNumber());
  }
}
