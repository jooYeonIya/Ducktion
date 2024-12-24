package shop.duction.be.community.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.community.dto.PopularityCommunitiesResponseDto;
import shop.duction.be.community.entity.Community;
import shop.duction.be.community.repository.CommunityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {

  private final CommunityRepository communityRepository;
  private final ModelMapper modelMapper;

  public List<PopularityCommunitiesResponseDto> getPopularCommunities(int userId) {
    List<Community> communities = communityRepository.findAll();
    return communities.stream()
            .map(community -> {
              PopularityCommunitiesResponseDto dto = modelMapper.map(community, PopularityCommunitiesResponseDto.class);
              dto.setFavorited(false);
              return dto;
            })
            .collect(Collectors.toList());
  }
}
