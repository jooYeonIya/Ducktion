package shop.duction.be.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.item.entity.RareRating;
import shop.duction.be.domain.item.entity.UserItemKey;

public interface RareRatingRepository extends JpaRepository<RareRating, UserItemKey> {
}
