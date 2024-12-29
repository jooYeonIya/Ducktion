package shop.duction.be.domain.bidding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.bidding.entity.ExhibitHistory;
import shop.duction.be.domain.bidding.enums.ExhibitStatus;
import shop.duction.be.domain.item.entity.UserItemKey;
import shop.duction.be.domain.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;

public interface ExhibitHistoryRepository extends JpaRepository<ExhibitHistory, UserItemKey> {
  @Query("""
        SELECT e
        FROM ExhibitHistory e
        LEFT JOIN FETCH e.item i
        LEFT JOIN FETCH i.itemImages
        WHERE e.user.userId = :userId
        AND e.status IN :types
        AND e.registTime BETWEEN :startDay AND :endDay
        ORDER BY e.registTime DESC
        """)
  List<ExhibitHistory> findExhibitHistoryByUserAndStatus(
          @Param("userId") Integer userId,
          @Param("startDay") LocalDateTime startDay,
          @Param("endDay") LocalDateTime endDay,
          @Param("types") List<String> types
  );
}
