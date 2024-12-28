package shop.duction.be.domain.bidding.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import shop.duction.be.domain.bidding.enums.ExhibitStatus;
import shop.duction.be.domain.bidpoint.entity.BidHistory;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.UserItemKey;
import shop.duction.be.domain.user.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ExhibitHistory {

    @EmbeddedId
    private UserItemKey userItemKey;    // 복합키 (itemId, userId)

    @MapsId("userId") // UserItemKey의 userId와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래키 매핑
    private User user;

    @MapsId("itemId") // UserItemKey의 itemId와 매핑
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "item_id", nullable = false) // 외래키 매핑
    private Item item;

    @Column(nullable = false)
    private LocalDateTime registTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExhibitStatus status;

    @OneToOne(mappedBy = "exhibitHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private BidHistory bidHistory;
}