package shop.duction.be.domain.bidpoint.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import shop.duction.be.domain.bidding.entity.BiddedHistory;
import shop.duction.be.domain.bidding.entity.ExhibitHistory;
import shop.duction.be.domain.bidpoint.enums.BidpointType;
import shop.duction.be.domain.user.entity.User;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BidHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bidHistoryId; // 비드 ID

    @Column(nullable = false)
    private Integer bidAmount; // 비드 수량

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BidpointType type; // 유형 (CHARGE, BIDDED, 등)

    @Column(nullable = false)
    private LocalDateTime transactionTime; // 거래 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 사용자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bidded_id")
    private BiddedHistory biddedHistory; // 낙찰 ID

    // 복합키 관계로 ExhibitHistory 참조
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false),
            @JoinColumn(name = "item_id", referencedColumnName = "item_id", insertable = false, updatable = false)
    })
    private ExhibitHistory exhibitHistory;
}

