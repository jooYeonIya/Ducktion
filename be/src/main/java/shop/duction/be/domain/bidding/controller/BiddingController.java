package shop.duction.be.domain.bidding.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.item.dto.BidRequestDTO;
import shop.duction.be.domain.item.service.ItemService;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.HttpStatusConstants;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Tag(name = "경매")
public class BiddingController {
  private final ItemService itemService;

  // 일단 하드 코딩
  private Integer userId = 1;

  @PostMapping("/{itemId}/bidding")
  @Operation(summary = "출품 상품 레어 점수 평가")
  public ResponseEntity<?> postBidding(@PathVariable int itemId, @RequestBody BidRequestDTO dto) {
    try {
      String result = itemService.bidding(itemId, userId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };
}
