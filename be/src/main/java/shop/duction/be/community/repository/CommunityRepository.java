package shop.duction.be.community.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import shop.duction.be.community.dto.PopularCommunitiesResponseDto;
import shop.duction.be.community.entity.Community;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {
  @Query("""
            SELECT new shop.duction.be.community.dto.PopularCommunitiesResponseDto(c.communityId, c.name, sum(i.totalView), false)
            FROM Item i JOIN i.community c
            GROUP BY c.communityId
            ORDER BY SUM(i.totalView) DESC
          """)
  List<PopularCommunitiesResponseDto> findPopularCommunitiesByViews();
}


