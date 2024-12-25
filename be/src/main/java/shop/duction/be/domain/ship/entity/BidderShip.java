package shop.duction.be.domain.ship.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.ship.enums.DeliveryId;
import shop.duction.be.domain.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BidderShip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shipId;

    @Enumerated(EnumType.STRING)
    private DeliveryId deliveryId; // ENUM 타입

    private String postNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
}

