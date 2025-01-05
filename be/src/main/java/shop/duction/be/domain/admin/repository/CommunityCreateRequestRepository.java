package shop.duction.be.domain.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.admin.entity.CommunityCreateRequest;

public interface CommunityCreateRequestRepository extends JpaRepository<CommunityCreateRequest, Integer> {
}
