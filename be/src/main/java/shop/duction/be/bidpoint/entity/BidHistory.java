package shop.duction.be.bidpoint.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import shop.duction.be.user.entity.User;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Bid_History")
public class BidHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bidId; // 비드 ID

    @Column(nullable = false)
    private Integer bidAmount; // 비드 수량

    @Column(nullable = false, length = 20)
    private String type; // 유형 (CHARGE, BIDDED, 등)

    @Column(nullable = false)
    private LocalDateTime transactionTime; // 거래 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 사용자

    private Integer biddedId; // 낙찰 ID
}

