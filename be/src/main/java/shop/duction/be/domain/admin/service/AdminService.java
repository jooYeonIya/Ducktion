package shop.duction.be.domain.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.admin.dto.CreateCommunityResponseDto;
import shop.duction.be.domain.admin.dto.DeleteItemResponseDto;
import shop.duction.be.domain.admin.dto.ReportInfoResponseDto;
import shop.duction.be.domain.admin.dto.ValidateItemInfoResponseDto;
import shop.duction.be.domain.admin.entity.CommunityCreateRequest;
import shop.duction.be.domain.admin.entity.ItemDeleteRequest;
import shop.duction.be.domain.admin.repository.CommunityCreateRequestRepository;
import shop.duction.be.domain.admin.repository.ItemDeleteRequestRepository;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.utils.DateTimeUtils;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
  private final CommunityCreateRequestRepository communityCreateRequestRepository;
  private final ItemDeleteRequestRepository itemDeleteRequestRepository;
  private final ItemRepository itemRepository;

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

  public List<DeleteItemResponseDto> getDeleteItemData() {
    List<ItemDeleteRequest> all = itemDeleteRequestRepository.findAll();
    return all.stream().map(request -> {
      return new DeleteItemResponseDto(
              request.getItem().getName(),
              request.getUser().getNickname(),
              "타이틀은 엔티티에 제목 추가한 후에 넣기로",
              request.getRequestReason(),
              DateTimeUtils.yearDateTimeFormatter.format(request.getRequestTime()));
    }).toList();
  }

  public List<ReportInfoResponseDto> getReportData() {
    return itemRepository.findAllReportInfos();
  }

  public List<ValidateItemInfoResponseDto> getValidateItemData() {
    List<Item> items = itemRepository.findCheckedItems();
    return items.stream().map(item -> {
      return new ValidateItemInfoResponseDto(
              item.getItemId(),
              item.getName(),
              DateTimeUtils.yearDateTimeFormatter.format(item.getEndBidTime()));
    }).toList();
  }
}
