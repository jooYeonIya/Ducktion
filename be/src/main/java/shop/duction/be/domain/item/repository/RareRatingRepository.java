package shop.duction.be.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.RareRating;
import shop.duction.be.domain.item.entity.UserItemKey;

import java.util.List;

public interface RareRatingRepository extends JpaRepository<RareRating, UserItemKey> {
  int countById_ItemId(int itemId);
}
