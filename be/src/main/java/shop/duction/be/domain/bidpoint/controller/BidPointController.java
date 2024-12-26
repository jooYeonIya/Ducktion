package shop.duction.be.domain.bidpoint.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.bidpoint.enums.BidpointType;
import shop.duction.be.domain.bidpoint.service.BidPointService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/bidpoint")
public class BidPointController {
  private final BidPointService bidPointService;

  // 일단 하드 코딩
  private Integer userId = 1;
  
  @PostMapping("/charge/{bidPoint}")
  public ResponseEntity<String> addChargeBidPoint(@PathVariable("bidPoint") Integer bidPoint) {
    return handleBidPointUpdate(bidPoint, BidpointType.CHARGE);
  }

  @PostMapping("/withdrwal/{bidPoint}")
  public ResponseEntity<String> addWithdrawBidPoint(@PathVariable("bidPoint") Integer bidPoint) {
    return handleBidPointUpdate(bidPoint, BidpointType.WITHDRAWAL);
  }

  private ResponseEntity<String> handleBidPointUpdate(Integer bidPoint, BidpointType type) {
    try {
      bidPointService.updateBidPoint(bidPoint, userId, type);
      return ResponseEntity.ok(type == BidpointType.CHARGE ? "충전 성공" : "현금화 성공");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했어요. 다시 시도해 주세요");
    }
  }
}
