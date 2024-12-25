package shop.duction.be.item.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.item.service.FavoriteItemService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/items/favorites")
public class FavoriteItemController {
  private final FavoriteItemService favoriteItemService;

  // 일단 하드 코딩
  private Integer userId = 1;

  @PostMapping("/add/{itemId}")
  public void addFavoriteItem(@PathVariable int itemId) {
    favoriteItemService.addFavoriteItem(itemId, userId);
  }

  @DeleteMapping("/delete/{itemId}")
  public void deleteFavoriteItem(@PathVariable int itemId) {
    favoriteItemService.deleteFavoriteItem(itemId, userId);
  }
}
