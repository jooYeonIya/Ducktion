package shop.duction.be.domain.bidding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.bidding.entity.BiddingHistory;

public interface BiddingHistoryRepository extends JpaRepository<BiddingHistory, Integer> {
}
