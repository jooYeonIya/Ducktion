package shop.duction.be.domain.bidding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.bidding.entity.BiddedHistory;

public interface BiddedHistoryRepository extends JpaRepository<BiddedHistory, Integer> {

}
