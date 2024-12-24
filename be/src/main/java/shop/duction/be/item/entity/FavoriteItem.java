package shop.duction.be.item.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import shop.duction.be.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteItem {

    @EmbeddedId
    private UserItemKey id; // 복합키 (itemId, userId)

    @Column(nullable = false)
    private LocalDateTime registDate;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
}


