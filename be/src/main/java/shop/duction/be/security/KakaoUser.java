package shop.duction.be.security;

public class KakaoUser {
  private Long id; // 카카오 회원번호
  private KakaoAccount kakaoAccount;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public KakaoAccount getKakaoAccount() {
    return kakaoAccount;
  }

  public void setKakaoAccount(KakaoAccount kakaoAccount) {
    this.kakaoAccount = kakaoAccount;
  }

  // 내부 클래스: 카카오 계정 정보
  public static class KakaoAccount {
    private String email;
    private Profile profile;
    private String phoneNumber;

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) { // 추가된 setter
      this.email = email;
    }

    public Profile getProfile() {
      return profile;
    }

    public void setProfile(Profile profile) { // 추가된 setter
      this.profile = profile;
    }

    public String getPhoneNumber() {
      return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) { // 추가된 setter
      this.phoneNumber = phoneNumber;
    }

    public static class Profile {
      private String nickName;
      private String profileImageUrl;

      public String getNickName() {
        return nickName;
      }

      public void setNickName(String nickName) { // 추가된 setter
        this.nickName = nickName;
      }

      public String getProfileImageUrl() {
        return profileImageUrl;
      }

      public void setProfileImageUrl(String profileImageUrl) { // 추가된 setter
        this.profileImageUrl = profileImageUrl;
      }
    }
  }
}
