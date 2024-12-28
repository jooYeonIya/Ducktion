package shop.duction.be.domain.bidding.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import shop.duction.be.domain.bidding.enums.BiddedStatus;
import shop.duction.be.domain.bidpoint.entity.BidHistory;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.user.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BiddedHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long biddedId;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private LocalDateTime biddedTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private BiddedStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @OneToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "bid_id", nullable = false)
    private BiddingHistory biddingHistory;

    @OneToMany(mappedBy = "biddedHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BidHistory> bidHistory;
}
