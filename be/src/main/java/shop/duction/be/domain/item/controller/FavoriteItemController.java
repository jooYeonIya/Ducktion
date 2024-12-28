package shop.duction.be.domain.item.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.item.service.FavoriteItemService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/items/favorites")
@Tag(name = "관심 출품 상품")
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
