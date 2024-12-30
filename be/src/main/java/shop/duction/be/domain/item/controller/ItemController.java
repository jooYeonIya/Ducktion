package shop.duction.be.domain.item.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import shop.duction.be.domain.item.dto.*;
import shop.duction.be.domain.item.service.ItemService;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.HttpStatusConstants;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Tag(name = "출품 상품")
public class ItemController {
  private final ItemService itemService;
  
  // 일단 하드 코딩
  private Integer userId = 1;

  @GetMapping("/editing/{itemId}")
  @Operation(summary = "수정할 상품 정보 보기")
  public ResponseEntity<?> getItemEdit(@PathVariable int itemId) {
    try {
      ViewItemEditResponseDTO dto = itemService.readItemEdit(itemId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(dto); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };

  @PutMapping("/editing/{itemId}")
  @Operation(summary = "상품 수정하기")
  public ResponseEntity<String> putItemEdit(@PathVariable int itemId, @RequestBody ItemEditRequestDTO dto) {
    try {
      String result = itemService.updateItem(itemId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };
  
  @GetMapping("/closingsoon")
  @Operation(summary = "마감 임박 상품 보기")
  public List<ItemCardResponseDto> getClosingSoonItems() {
    return itemService.getClosingSoonItems(userId);
  }

  @GetMapping("/mastersrare")
  @Operation(summary = "마스터 컬렉터즈 레어 상품 보기")
  public List<ItemCardResponseDto> getMastersCollectorsRare() {
    return itemService.getMastersCollectorsRare(userId);
  }

  @PostMapping()
  @Operation(summary = "상품 등록하기")
  public ResponseEntity<?> postItem(@RequestBody RegistItemRequestDTO dto) {
    try {
      Integer result = itemService.createItem(userId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  
  @GetMapping("/{itemId}")
  @Operation(summary = "출품 상품 상세 보기")
  public ResponseEntity<?> getItemDetails(@PathVariable int itemId) {
    try {
      ViewItemDetailsResponseDTO dto = itemService.readItemDetails(itemId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(dto); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };

  @PostMapping("/{itemId}/rare_score")
  @Operation(summary = "출품 상품 레어 점수 평가")
  public ResponseEntity<?> postItemRareScore(@PathVariable int itemId, @RequestBody ItemRareScoreRequestDTO dto) {
    try {
      String result = itemService.createOrUpdateRareRating(itemId, userId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };

  @PutMapping("/{itemId}/report")
  @Operation(summary = "신고하기")
  public ResponseEntity<?> putReport(@PathVariable int itemId) {
    try {
      String result = itemService.report(itemId, userId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };

  @GetMapping("/histories/count")
  @Operation(summary = "이력 횟수 불러오기")
  public HistoriesCountResponseDto getHistoriesCount() {
    return itemService.getHistoriesCount(userId);
  }

  @PostMapping("/histories/bidding")
  @Operation(summary = "입찰 이력 불러오기")
  public ArrayList<BiddingHistoriesResponseDto> getBiddingHistory(@RequestBody HistoriesRequestDto historiesRequestDto) {
    return itemService.getBiddingHistory(historiesRequestDto, userId);
  }

  @PostMapping("/histories/exhibit")
  @Operation(summary = "출품 이력 불러오기")
  public List<ItemCardResponseDto> getExhibitHistory(@RequestBody HistoriesRequestDto historiesRequestDto) {
    return itemService.getExhibitHistory(historiesRequestDto, userId);
  }

  @PostMapping("/auction")
  @Operation(summary = "출품 상품 목록 불러오기")
  public Page<ItemCardResponseDto> getItemsByCommunityId(@RequestBody AuctionItemsRequestDto auctionItemsRequestDto) {
    return itemService.getItemsByCommunityId(auctionItemsRequestDto, userId);
  }
}
