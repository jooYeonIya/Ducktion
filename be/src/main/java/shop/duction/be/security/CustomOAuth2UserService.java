package shop.duction.be.security;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.enums.IsActive;
import shop.duction.be.domain.user.enums.Role;
import shop.duction.be.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
  private final UserRepository userRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    Map<String, Object> attributeMap = oAuth2User.getAttribute("kakao_account");
    String email = (String) attributeMap.get("email");
    User user = userRepository.findByEmail(email)
            .orElseGet(() -> registUser(attributeMap));

    return new CustomOAuth2User(user, oAuth2User.getAttributes());
  }

  private User registUser(Map<String, Object> attributeMap) {
    User user = User.builder()
            .email((String)attributeMap.get("email"))
            .nickname((String) ((Map)attributeMap.get("profile")).get("nickname"))
//            .profileImage((String) ((Map)attributeMap.get("profile")).get("profile_image_url"))
            .phone((String)attributeMap.get("phone_number"))
            .isActive(IsActive.ACTIVE)
            .role(Role.USER)
            .heldBid(0)
            .usableBid(0)
            .rate(50f)
            .penaltyCount(0)
            .registTime(LocalDateTime.now())
            .build();
    return userRepository.save(user);
  }
}
