package shop.duction.be.domain.bidpoint.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.bidpoint.dto.BidPointHistoriesRequestDto;
import shop.duction.be.domain.bidpoint.dto.BidPointHistoriesResponseDto;
import shop.duction.be.domain.bidpoint.dto.UserBidPointResponse;
import shop.duction.be.domain.bidpoint.enums.BidPointType;
import shop.duction.be.domain.bidpoint.service.BidPointService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/bidpoint")
@Tag(name = "비드 이력")
public class BidPointController {
  private final BidPointService bidPointService;

  // 일단 하드 코딩
  private Integer userId = 1;

  @GetMapping("/user")
  public UserBidPointResponse getUserBidPoint() {
    return bidPointService.getUserBidPoint(userId);
  }

  @PostMapping("/histories")
  public List<BidPointHistoriesResponseDto> getBidPointHistories(@RequestBody BidPointHistoriesRequestDto request) {
    return bidPointService.getBidPointHistories(request, userId);
  }

  @PostMapping("/charge/{bidPoint}")
  public ResponseEntity<String> addChargeBidPoint(@PathVariable("bidPoint") Integer bidPoint) {
    return handleBidPointUpdate(bidPoint, BidPointType.CHARGE);
  }

  @PostMapping("/withdrwal/{bidPoint}")
  public ResponseEntity<String> addWithdrawBidPoint(@PathVariable("bidPoint") Integer bidPoint) {
    return handleBidPointUpdate(bidPoint, BidPointType.WITHDRAWAL);
  }

  private ResponseEntity<String> handleBidPointUpdate(Integer bidPoint, BidPointType type) {
    try {
      bidPointService.updateBidPoint(bidPoint, userId, type);
      return ResponseEntity.ok(type == BidPointType.CHARGE ? "충전 성공" : "현금화 성공");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했어요. 다시 시도해 주세요");
    }
  }
}
