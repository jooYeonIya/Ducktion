package shop.duction.be.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
  User findHeldBidAndUsableBidByUserId(Integer id);
}
