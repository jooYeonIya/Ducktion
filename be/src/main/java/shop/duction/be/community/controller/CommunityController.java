package shop.duction.be.community.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.duction.be.community.dto.PopularityCommunitiesResponseDto;
import shop.duction.be.community.service.CommunityService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/communities")
@Slf4j
public class CommunityController {
  private final CommunityService communityService;

  // 일단 하드코딩
  private int userId = 12;

  @GetMapping("/popularity")
  public List<PopularityCommunitiesResponseDto> getPopularCommunities() {
    List<PopularityCommunitiesResponseDto> result = communityService.getPopularCommunities(userId);
    log.info("getPopularCommunities {}", result);
    return communityService.getPopularCommunities(userId);
  }
}
