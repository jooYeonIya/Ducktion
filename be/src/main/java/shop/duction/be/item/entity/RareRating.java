package shop.duction.be.item.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "RareRating")
public class RareRating {

    @EmbeddedId
    private UserItemKey id; // 복합키 (itemId, userId)

    @Column(name = "rare_score", nullable = false)
    private Float rareScore; // 레어 점수
}

