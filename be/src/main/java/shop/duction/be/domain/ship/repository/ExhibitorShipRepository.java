package shop.duction.be.domain.ship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.ship.entity.ExhibitorShip;

public interface ExhibitorShipRepository extends JpaRepository<ExhibitorShip, Integer> {
  @Query("""
            SELECT COUNT(e)
            FROM ExhibitorShip e
            WHERE e.user.userId = :userId AND e.item.itemId = :itemId
        """)
  int countByUserIdAndItemId(@Param("userId") Integer userId, @Param("itemId") Integer itemId);
}
