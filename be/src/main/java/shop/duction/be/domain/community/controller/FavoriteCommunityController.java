package shop.duction.be.domain.community.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<String> addFavoriteCommunity(@PathVariable("communityId") int communityId) {
    try {
      favoriteCommunityService.addFavoriteCommunity(communityId, userId);
      return ResponseEntity.ok("관심 커뮤니티 등록 성공");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
    }
  }

  @DeleteMapping("/delete/{communityId}")
  public void deleteFavoriteCommunity(@PathVariable("communityId") int communityId) {
    favoriteCommunityService.deleteFavoriteCommunity(communityId, userId);
  }
}
