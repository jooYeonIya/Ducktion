package shop.duction.be.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import shop.duction.be.item.entity.Item;
import shop.duction.be.user.entity.User;

@Entity
@Table(name = "item_delete_request")
public class ItemDeleteRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id", nullable = false)
    private int requestId;

    @Column(name = "request_reason", nullable = false, columnDefinition = "TEXT")
    private String requestReason;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;
}

