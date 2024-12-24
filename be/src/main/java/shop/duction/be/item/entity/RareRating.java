package shop.duction.be.item.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "RareRating")
public class RareRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Integer ratingId; // 레어 등급 평가 ID

    @Column(name = "item_id", nullable = false)
    private Integer itemId; // 상품 ID

    @Column(name = "user_id", nullable = false)
    private Integer userId; // 사용자 ID

    @Column(name = "rare_score", nullable = false)
    private Float rareScore; // 레어 점수
}

