package shop.duction.be.bidding.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BiddingHistory")
public class BiddingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id")
    private Long bidId;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "bid_time")
    private LocalDateTime bidTime;

    @Column(name = "status", length = 20, nullable = false)
    private String status; // ENUM 처리 가능

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "item_id", nullable = false)
    private Long itemId;



}
