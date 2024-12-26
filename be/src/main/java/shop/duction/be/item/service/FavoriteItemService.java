package shop.duction.be.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.item.entity.FavoriteItem;
import shop.duction.be.item.entity.UserItemKey;
import shop.duction.be.domain.item.repository.FavoriteItemRepository;
import shop.duction.be.user.entity.User;
import shop.duction.be.user.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteItemService {

  private final FavoriteItemRepository favoriteItemRepository;
  private final UserRepository userRepository;

  public void addFavoriteItem(int itemId, int userId) {
    // JMT ..인증 어쩌고 로 바꿔야 하는!!!!
    User user = userRepository.findById(userId).orElse(null);

    UserItemKey userItemKey = new UserItemKey(itemId, userId);
    FavoriteItem favoriteItem = new FavoriteItem();
    favoriteItem.setUser(user);
    favoriteItem.setId(userItemKey);
    favoriteItem.setRegistDate(LocalDateTime.now());
    favoriteItemRepository.save(favoriteItem);
  }

  public void deleteFavoriteItem(int itemId, int userId) {
    UserItemKey userItemKey = new UserItemKey(itemId, userId);
    favoriteItemRepository.deleteById(userItemKey);
  }
}
