package shop.duction.be.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.item.entity.FavoriteItem;
import shop.duction.be.item.entity.UserItemKey;
import shop.duction.be.user.entity.User;

import java.util.List;

public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, UserItemKey> {
  @Query("""
            SELECT fi.id.itemId
            FROM FavoriteItem fi
            WHERE fi.id.userId = :userId AND fi.id.itemId IN :itemIds
        """)
  List<Integer> findeFavoriteItemsByUserAndItemIds(@Param("userId") Integer userId, @Param("itemIds") List<Integer> itemIds);

  Integer user(User user);
}
