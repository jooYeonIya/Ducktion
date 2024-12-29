package shop.duction.be.domain.ship.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.ship.dto.ShipInfoResponseDto;
import shop.duction.be.domain.ship.service.ShipService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ship")
@RequiredArgsConstructor
public class ShipController {
  private final ShipService shipService;

  @GetMapping("/biddership/{itemId}")
  public ShipInfoResponseDto getBiddershipInvoice(@PathVariable Integer itemId) {
    return shipService.getBiddershipInvoice(itemId);
  }
}