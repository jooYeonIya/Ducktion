package shop.duction.be.domain.ship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.ship.entity.BidderShip;

public interface BidderShipRepository extends JpaRepository<BidderShip, Integer> {
  BidderShip findByItem_ItemId(Integer itemId);
}
