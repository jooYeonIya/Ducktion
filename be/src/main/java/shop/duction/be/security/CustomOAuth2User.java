package shop.duction.be.security;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import shop.duction.be.domain.user.entity.User;

@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User {
  User user;
  Map<String, Object> attributeMap;

  public User getUser() {
    return this.user;
  }

  @Override
  public Map<String, Object> getAttributes() {
    return this.attributeMap;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + this.user.getRole().name()));
  }

  @Override
  public String getName() {
    return this.user.getNickname();
  }
}
