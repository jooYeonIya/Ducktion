package shop.duction.be.bidding.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BiddedHistory")
public class BiddedHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bidded_id")
    private Long biddedId;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "bidded_time")
    private LocalDateTime biddedTime;

    @Column(name = "status", length = 20, nullable = false)
    private String status; // ENUM 처리 가능

    @Column(name = "bid_id", nullable = false)
    private Long bidId;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
