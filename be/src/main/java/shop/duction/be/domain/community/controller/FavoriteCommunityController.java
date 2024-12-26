package shop.duction.be.domain.community.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.community.service.FavoriteCommunityService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/communities/favorites")
public class FavoriteCommunityController {

  private final FavoriteCommunityService favoriteCommunityService;

  // 일단 하드코딩
  private Integer userId = 1;

  @PostMapping("/add/{communityId}")
  public void addFavoriteCommunity(@PathVariable("communityId") int communityId) {
    favoriteCommunityService.addFavoriteCommunity(communityId, userId);
  }

  @DeleteMapping("/delete/{communityId}")
  public void deleteFavoriteCommunity(@PathVariable("communityId") int communityId) {
    favoriteCommunityService.deleteFavoriteCommunity(communityId, userId);
  }
}
