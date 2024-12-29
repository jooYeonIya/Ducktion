package shop.duction.be.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.user.entity.ExhibitorRating;

public interface ExhibitorRatingRepository extends JpaRepository<ExhibitorRating, Integer> {
  @Query("""
            SELECT COALESCE(SUM(e.rate), 0), COUNT(e.rate)
            FROM ExhibitorRating e
            WHERE e.exhibitor.userId = :exhibitorId
        """)
  Object[] findExhibitorRatingData(@Param("exhibitorId") Integer exhibitorId);

  @Query("""
            SELECT COUNT(e)
            FROM ExhibitorRating e
            WHERE e.exhibitor.userId = :exhibitorId AND e.evaluator.userId = :evaluatorId
        """)
  int countByEvaluatorAndExhibitor(@Param("exhibitorId") Integer exhibitorId, @Param("evaluatorId") Integer evaluatorId);
}
