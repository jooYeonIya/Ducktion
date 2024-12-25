package shop.duction.be.domain.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.user.entity.User;

@Entity
public class ItemDeleteRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int requestId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String requestReason;

    @Column(nullable = false)
    private LocalDateTime requestTime;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

