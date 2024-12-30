package shop.duction.be.domain.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.admin.dto.*;
import shop.duction.be.domain.admin.entity.CommunityCreateRequest;
import shop.duction.be.domain.admin.entity.ItemDeleteRequest;
import shop.duction.be.domain.admin.repository.CommunityCreateRequestRepository;
import shop.duction.be.domain.admin.repository.ItemDeleteRequestRepository;
import shop.duction.be.domain.community.entity.Community;
import shop.duction.be.domain.community.repository.CommunityRepository;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.enums.AuctionStatus;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.item.service.ItemService;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.DateTimeUtils;
import shop.duction.be.utils.InitialExtractor;
import shop.duction.be.utils.email.EmailMessageInfo;
import shop.duction.be.utils.email.SendEamilMessage;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
  private final CommunityCreateRequestRepository communityCreateRequestRepository;
  private final ItemDeleteRequestRepository itemDeleteRequestRepository;
  private final ItemRepository itemRepository;
  private final CommunityRepository communityRepository;

  private final ItemService itemService;

  private final SendEamilMessage sendEamilMessage;

  public List<CreateCommunityResponseDto> getCreateCommunityData() {
    List<CommunityCreateRequest> all = communityCreateRequestRepository.findAll();

    return all.stream().map(request -> {
      return new CreateCommunityResponseDto(
              request.getUser().getNickname(),
              request.getUser().getEmail(),
              request.getRequestId(),
              request.getName(),
              request.getRequestReason(),
              DateTimeUtils.yearDateTimeFormatter.format(request.getRequestTime()));
    }).toList();
  }

  public ResponseEntity<String> createCommunity(String communityName, Integer requestId) {
    Community community = new Community();
    community.setName(communityName);
    community.setFirstWord(InitialExtractor.getFirstChar(communityName));
    community.setRegistTime(LocalDateTime.now());
    Community save = communityRepository.save(community);
    communityCreateRequestRepository.deleteById(requestId);
    return save != null ? ResponseEntity.ok("커뮤니티 개설 완료") : ResponseEntity.notFound().build();
  }

  public ResponseEntity<String> postRejectCommunity(RejectInfoRequestDto request) {
    communityCreateRequestRepository.deleteById(request.getRequestId());
    String rejectSubject = SendEamilMessage.createRejectSubject(request.getTitle());
    String rejectBody = SendEamilMessage.createRejectBody(request.getTitle(), request.getRejectReason());
    EmailMessageInfo eamilMessageInfo = new EmailMessageInfo(request.getEmail(), rejectSubject, rejectBody);
    sendEamilMessage.sendMail(eamilMessageInfo);
    return ResponseEntity.ok("커뮤니티 요청 반려 완료");
  }

  public List<DeleteItemResponseDto> getDeleteItemData() {
    List<ItemDeleteRequest> all = itemDeleteRequestRepository.findAll();
    return all.stream().map(request -> {
      return new DeleteItemResponseDto(
              request.getItem().getItemId(),
              request.getItem().getName(),
              request.getRequestId(),
              request.getUser().getNickname(),
              request.getUser().getEmail(),
              "타이틀은 엔티티에 제목 추가한 후에 넣기로",
              request.getRequestReason(),
              DateTimeUtils.yearDateTimeFormatter.format(request.getRequestTime()));
    }).toList();
  }

  public ResponseEntity<String> deleteItemData(Integer itemId, Integer requestId) {
    itemRepository.deleteById(itemId);
    return ResponseEntity.ok("삭제 완료");
  }

  public ResponseEntity<String> postRejectDeleteItem(RejectInfoRequestDto request) {
    itemDeleteRequestRepository.deleteById(request.getRequestId());
    String rejectSubject = SendEamilMessage.createRejectSubject(request.getTitle());
    String rejectBody = SendEamilMessage.createRejectBodyForDeleteItem(request.getTitle(), request.getRejectReason());
    EmailMessageInfo eamilMessageInfo = new EmailMessageInfo(request.getEmail(), rejectSubject, rejectBody);
    sendEamilMessage.sendMail(eamilMessageInfo);
    return ResponseEntity.ok("삭제 요청 반려 완료");
  }

  // 신고 관련
  public List<ReportInfoResponseDto> getReportData() {
    return itemRepository.findAllReportInfos();
  }

  public ResponseEntity<String> submitReport(Integer itemId, String rejectReason) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

    String itemName = item.getName();
    String email = item.getUser().getEmail();

    switch (item.getAuctionStatus()) {
      case BIDDING_BEFORE:
      case BIDDING_NOT:
        // 입찰 전, 낙찰 실패 -> 삭제
        itemRepository.deleteById(itemId);
        break;

      case BIDDED:
        // 낙찰된 상품 -> 낙찰 취소
        itemService.cancelBidded(item);
        item.setReportedCount(0);
        itemRepository.save(item);
        break;

      case BIDDING_UNDER:
        // 입찰 중 -> 입찰 비드 반환 후 삭제
        itemService.refundBidPoints(item);
        itemRepository.deleteById(itemId);
        break;

      default:
        // 경매 완료 -> 삭제 불가
        return ResponseEntity.ok("상품 삭제 불가합니다. 반려해 주세요.");
    }

    String cancelSubject = SendEamilMessage.createCancelSubject(itemName);
    String submitReportBody = SendEamilMessage.createSubmitReportBody(itemName, rejectReason);
    EmailMessageInfo emailMessageInfo = new EmailMessageInfo(email, cancelSubject, submitReportBody);
    sendEamilMessage.sendMail(emailMessageInfo);

    return ResponseEntity.ok("신고 상품 취소 완료");
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
