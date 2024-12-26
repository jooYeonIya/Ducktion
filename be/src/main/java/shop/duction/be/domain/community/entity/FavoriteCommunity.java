package shop.duction.be.domain.community.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.duction.be.domain.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteCommunity {

    @EmbeddedId
    private FavoriteCommunityId favoriteCommunityId;

    @MapsId("userId") // FavoriteCommunityId의 userId와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래키 매핑
    private User user;

    @MapsId("communityId") // FavoriteCommunityId의 communityId 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false) // 외래키 매핑
    private Community community;

    @Column(nullable = false)
    private LocalDateTime registDate;
}

