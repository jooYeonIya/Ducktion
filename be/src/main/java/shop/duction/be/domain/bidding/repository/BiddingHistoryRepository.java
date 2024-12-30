package shop.duction.be.domain.bidding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.bidding.entity.BiddingHistory;

import java.time.LocalDateTime;
import java.util.List;

public interface BiddingHistoryRepository extends JpaRepository<BiddingHistory, Long> {

  @Query("""
    SELECT b
    FROM BiddingHistory b
    JOIN FETCH b.item i
    LEFT JOIN FETCH i.itemImages
    WHERE b.user.userId = :userId
    AND b.bidTime BETWEEN :startDay AND :endDay
    AND b.status IN :types
    ORDER BY b.item.itemId, b.bidTime DESC
""")
  List<BiddingHistory> findBidHistoriesByTypesAndDate(
          @Param("userId") Integer userId,
          @Param("startDay") LocalDateTime startDay,
          @Param("endDay") LocalDateTime endDay,
          @Param("types") List<String> types
  );

  List<BiddingHistory> findByItem_ItemId(Integer itemId);
}
