package shop.duction.be.community.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.community.dto.PopularCommunitiesResponseDto;
import shop.duction.be.community.repository.CommunityRepository;
import shop.duction.be.community.repository.FavoriteCommunityRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {

  private final CommunityRepository communityRepository;
  private final FavoriteCommunityRepository favoriteCommunityRepository;

  public List<PopularCommunitiesResponseDto> getPopularCommunitiesByViews(Integer userId) {
    List<PopularCommunitiesResponseDto> top10Communities = communityRepository.findPopularCommunitiesByViews()
            .stream()
            .limit(10)
            .toList();

    if (userId != null) {
      List<Integer> communityIds = top10Communities.stream()
              .map(PopularCommunitiesResponseDto::getCommunityId)
              .toList();

      List<Integer> ids = favoriteCommunityRepository.findFavoriteCommunitiesByUserAndCommunityIds(userId, communityIds);

      return top10Communities.stream()
              .peek(community -> {
                boolean isFavorite = ids.contains(community.getCommunityId());
                community.setFavorite(isFavorite);
              })
              .toList();
    }

    return top10Communities;
  }
}