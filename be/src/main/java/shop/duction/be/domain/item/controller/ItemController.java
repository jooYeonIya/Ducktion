package shop.duction.be.domain.item.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.duction.be.domain.item.dto.ItemCardResponseDto;
import shop.duction.be.item.service.ItemService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/items")
public class ItemController {

  private final ItemService itemService;

  // 일단 하드 코딩
  private Integer userId = 1;

  @GetMapping("/closingsoon")
  public List<ItemCardResponseDto> getClosingSoonItems() {
    return itemService.getClosingSoonItems(userId);
  }

  @GetMapping("/mastersrare")
  public List<ItemCardResponseDto> getMastersCollectorsRare() {
    return itemService.getMastersCollectorsRare(userId);
  }
}
