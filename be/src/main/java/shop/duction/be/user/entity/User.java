package shop.duction.be.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import shop.duction.be.bidpoint.entity.BidPoint;
import shop.duction.be.community.entity.FavoriteCommunity;
import shop.duction.be.item.entity.FavoriteItem;
import shop.duction.be.ship.entity.BidderShip;
import shop.duction.be.ship.entity.ExhibitorShip;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId; // 사용자 ID

    @Column(unique = true, nullable = false, length = 40)
    private String email; // 이메일

    @Column(unique = true, nullable = false, length = 20)
    private String nickname; // 닉네임

    private String profileImage; // 프로필 사진

    @Column(nullable = false, length = 20)
    private String isActive; // 상태 (ACTIVE, INACTIVE, SUSPENDED)

    @Column(nullable = false, length = 20)
    private String role; // 역할 (USER, ADMIN)

    private String phone; // 휴대폰 번호

    private String address; // 주소

    @Column(nullable = false)
    private Integer heldBid = 0; // 보유 비드

    @Column(nullable = false)
    private Integer usableBid = 0; // 사용 가능 비드

    @Column(nullable = false)
    private Integer penaltyCount = 0; // 패널티 횟수

    private String refreshToken; // 리프레시 토큰

    @Column(nullable = false)
    private LocalDateTime registDate; // 가입 일시

    // 관계 매핑
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BidPoint> bidHistories;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteItem> favoriteItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteCommunity> favoriteCommunities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExhibitorShip> exhibitorShips;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BidderShip> bidderShips;

    @OneToMany(mappedBy = "exhibitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExhibitorRating> exhibitorRatings;

    @OneToMany(mappedBy = "evaluator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExhibitorRating> evaluations;
}


