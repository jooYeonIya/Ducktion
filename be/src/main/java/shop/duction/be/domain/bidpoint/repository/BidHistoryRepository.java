package shop.duction.be.domain.bidpoint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.bidpoint.entity.BidHistory;
import shop.duction.be.domain.bidpoint.enums.BidPointHistoriesSortType;
import shop.duction.be.domain.bidpoint.enums.BidPointType;
import shop.duction.be.domain.user.entity.User;

import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;

public interface BidHistoryRepository extends JpaRepository<BidHistory, Integer> {
  @Query("""
            FROM BidHistory b
            LEFT JOIN FETCH b.biddedHistory bh
            LEFT JOIN FETCH bh.item i
            WHERE b.user.userId = :userId
            AND b.transactionTime BETWEEN :startDay AND :endDay
            AND b.type IN :types
            ORDER BY b.transactionTime DESC
          """)
  List<BidHistory> findBidHistoriesByTypesAndDate(
          @Param("userId") Integer userId,
          @Param("startDay") LocalDateTime startDay,
          @Param("endDay") LocalDateTime endDay,
          @Param("types") List<String> types
  );
}
