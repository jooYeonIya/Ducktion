package shop.duction.be.community.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.community.entity.Community;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
  List<Community> findAll();
}
