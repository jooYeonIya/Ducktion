package shop.duction.be.domain.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.admin.entity.ItemDeleteRequest;

public interface ItemDeleteRequestRepository extends JpaRepository<ItemDeleteRequest, Integer> {
}
