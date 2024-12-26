package shop.duction.be.bidpoint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.bidpoint.entity.BidHistory;

public interface BidPointRepository extends JpaRepository<BidHistory, Integer> {
}
