package shop.duction.be.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
