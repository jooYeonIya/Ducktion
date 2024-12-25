package shop.duction.be.community.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.community.dto.PopularCommunitiesResponseDto;
import shop.duction.be.community.service.CommunityService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/communities")
public class CommunityController {

  private final CommunityService communityService;

  // 일단 하드코딩
  private Integer userId = 1;

  @GetMapping("/popular")
  public List<PopularCommunitiesResponseDto> getPopularCommunities() {
    return communityService.getPopularCommunitiesByViews(userId);
  }
}
