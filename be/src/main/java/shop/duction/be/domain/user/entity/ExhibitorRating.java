package shop.duction.be.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExhibitorRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exhibitorRatingId; // 평점 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibitor_id", nullable = false)
    private User exhibitor; // 출품자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluators_id", nullable = false)
    private User evaluator; // 평가자

    @Column(nullable = false)
    private Float rate; // 점수
}

