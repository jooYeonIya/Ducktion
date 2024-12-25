package shop.duction.be.item.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.item.entity.Item;
import shop.duction.be.item.enums.BiddingStatus;
import shop.duction.be.item.enums.RareTier;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
  @Query("""
            SELECT i
            FROM Item i LEFT JOIN FETCH i.itemImages ii
            WHERE FUNCTION('DATE', i.endTime) = CURRENT_DATE
            AND i.biddingStatus IN :status
            ORDER BY i.totalView DESC
         """)
  List<Item> findClosingSoonItemsByViews(Pageable pageable, @Param("status") List<Integer> status);

  @Query(""" 
            SELECT i
            FROM Item i
            WHERE i.rareTier = :rareTier
            ORDER BY 
                CASE 
                    WHEN i.immediatePrice IS NOT NULL THEN i.immediatePrice
                    WHEN i.nowPrice IS NOT NULL THEN i.nowPrice
                    ELSE i.startPrice
                END DESC
        """)
  List<Item> findMasterRareItemsByPrice(Pageable pageable, @Param("rareTier") RareTier rareTier);
}
