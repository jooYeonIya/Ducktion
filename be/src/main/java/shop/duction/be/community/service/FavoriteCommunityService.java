package shop.duction.be.community.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.community.entity.FavoriteCommunity;
import shop.duction.be.community.repository.FavoriteCommunityRepository;
import shop.duction.be.user.entity.User;
import shop.duction.be.user.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteCommunityService {
  private final FavoriteCommunityRepository favoriteCommunityRepository;
  private final UserRepository userRepository;

  public void addFavoriteCommunity(int communityId, int userId) {
    // JMT ..인증 어쩌고 로 바꿔야 하는!!!!
    User user = userRepository.findById(userId).orElse(null);

    FavoriteCommunity favoriteCommunity = new FavoriteCommunity();
    favoriteCommunity.setCommunityId(communityId);
    favoriteCommunity.setRegistDate(LocalDateTime.now());
    favoriteCommunity.setUser(user);

    favoriteCommunityRepository.save(favoriteCommunity);
  }
}
