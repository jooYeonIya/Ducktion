package shop.duction.be.domain.item.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import shop.duction.be.domain.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteItem {

    @EmbeddedId
    private UserItemKey id; // 복합키 (itemId, userId)

    @MapsId("userId") // UserItemKey의 userId와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래키 매핑
    private User user;

    @MapsId("itemId") // UserItemKey의 itemId와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false) // 외래키 매핑
    private Item item;

    @Column(nullable = false)
    private LocalDateTime registDate;
}


