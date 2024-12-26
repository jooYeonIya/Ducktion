package shop.duction.be.domain.bidpoint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.bidpoint.entity.BidHistory;


public interface BidHistoryRepository extends JpaRepository<BidHistory, Integer> {
}
