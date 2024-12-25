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
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExhibitorShip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shipId; // 배송 ID

    @Enumerated(EnumType.STRING)
    private DeliveryId deliveryId; // 배송 상태 (ENUM 가능)

    private String postNumber; // 송장 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
}

