package shop.duction.be.ship.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.duction.be.user.entity.User;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ExhibitorShip")
public class ExhibitorShip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shipId; // 배송 ID

    @Column(nullable = false, length = 20)
    private String deliveryId; // 배송 상태 (ENUM 가능)

    private String postNumber; // 송장 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 사용자

    @Column(nullable = false)
    private Integer itemId; // 상품 ID
}

