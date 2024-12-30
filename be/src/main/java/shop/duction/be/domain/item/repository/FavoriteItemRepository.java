package shop.duction.be.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.item.entity.FavoriteItem;
import shop.duction.be.domain.item.entity.UserItemKey;

import java.util.List;

public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, UserItemKey> {
  @Query("""
            SELECT fi.id.itemId
            FROM FavoriteItem fi
            WHERE fi.id.userId = :userId AND fi.id.itemId IN :itemIds
        """)
  List<Integer> findeFavoriteItemsByUserAndItemIds(@Param("userId") Integer userId, @Param("itemIds") List<Integer> itemIds);
  void deleteById(UserItemKey id);
  List<FavoriteItem> findById_UserId(Integer userId);
}
