package shop.duction.be.item.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.duction.be.item.entity.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
  @Query("""
            SELECT i
            FROM Item i LEFT JOIN FETCH i.itemImages ii
            WHERE FUNCTION('DATE', i.endTime) = CURRENT_DATE
            ORDER BY i.totalView DESC
         """)
  List<Item> findClosingSoonItemsByViews(Pageable pageable);
}
