package shop.duction.be.bidpoint.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.bidpoint.service.BidPointService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/bidpoint")
public class BidPointController {
  private final BidPointService bidPointService;

  // 일단 하드 코딩
  private Integer userId = 1;

  @PostMapping("/charge/{bidPoint}")
  public void addChargeBidPoint(@PathVariable("bidPoint") int bidPoint) {
    bidPointService.addChargeBidPoint(bidPoint, userId);
  }
}
