package shop.duction.be.domain.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.community.entity.Community;
import shop.duction.be.domain.community.repository.CommunityRepository;
import shop.duction.be.domain.item.dto.ItemCardResponseDto;
import shop.duction.be.domain.item.entity.FavoriteItem;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.UserItemKey;
import shop.duction.be.domain.item.repository.FavoriteItemRepository;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteItemService {

  private final FavoriteItemRepository favoriteItemRepository;
  private final UserRepository userRepository;
  private final ItemRepository itemRepository;

  public void addFavoriteItem(int itemId, int userId) {
    // JMT ..인증 어쩌고 로 바꿔야 하는!!!!
    User user = userRepository.findById(userId).orElse(null);
    Item item = itemRepository.findById(itemId).orElse(null);

    UserItemKey userItemKey = new UserItemKey(itemId, userId);
    FavoriteItem favoriteItem = new FavoriteItem();
    favoriteItem.setUser(user);
    favoriteItem.setId(userItemKey);
    favoriteItem.setRegistDate(LocalDateTime.now());
    favoriteItem.setItem(item);
    favoriteItemRepository.save(favoriteItem);
  }

  public void deleteFavoriteItem(int itemId, int userId) {
    UserItemKey userItemKey = new UserItemKey(itemId, userId);
    favoriteItemRepository.deleteById(userItemKey);
  }

  public List<ItemCardResponseDto> getFavoriteItems(Integer userId) {
    List<FavoriteItem> favoriteItems = favoriteItemRepository.findById_UserId(userId);
    return favoriteItems.stream()
            .map(favoriteItem -> {
              Item item = itemRepository.findById(favoriteItem.getItem().getItemId())
                      .orElseThrow(() -> new RuntimeException("상품 없음"));
              return ItemCardResponseDto.fromItem(item, true);
            })
            .toList();
  }
}
