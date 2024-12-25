package shop.duction.be.community.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.duction.be.community.entity.FavoriteCommunity;

import java.util.List;

@Repository
public interface FavoriteCommunityRepository extends JpaRepository<FavoriteCommunity, Integer> {
  @Query("""
            SELECT fc.communityId
            FROM FavoriteCommunity fc
            WHERE fc.user.userId = :userId AND fc.communityId IN :communityIds
         """)
  List<Integer> findFavoriteCommunitiesByUserAndCommunityIds(@Param("userId") Integer userId, @Param("communityIds") List<Integer> communityIds);
}
