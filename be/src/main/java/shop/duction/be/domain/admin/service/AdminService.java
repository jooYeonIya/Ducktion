package shop.duction.be.domain.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import shop.duction.be.domain.admin.dto.CreateCommunityResponseDto;
import shop.duction.be.domain.admin.entity.CommunityCreateRequest;
import shop.duction.be.domain.admin.repository.CommunityCreateRequestRepository;
import shop.duction.be.utils.DateTimeUtils;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
  private final CommunityCreateRequestRepository communityCreateRequestRepository;

  public List<CreateCommunityResponseDto> getCreateCommunityData() {
    List<CommunityCreateRequest> all = communityCreateRequestRepository.findAll();

    return all.stream().map(request -> {
      return new CreateCommunityResponseDto(
              request.getUser().getNickname(),
              request.getName(),
              request.getRequestReason(),
              DateTimeUtils.yearDateTimeFormatter.format(request.getRequestTime()));
    }).toList();
  }
}
