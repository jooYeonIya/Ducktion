package shop.duction.be.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.user.entity.ExhibitorRating;

public interface ExhibitorRatingRepository extends JpaRepository<ExhibitorRating, Integer> {
}
