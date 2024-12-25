package shop.duction.be.domain.item.entity;

import jakarta.persistence.*;
import lombok.*;
import shop.duction.be.domain.user.entity.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer logId; // 로그 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item; // 상품 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 사용자 ID

    @Column(nullable = false)
    private Integer views; // 조회수

    @Column(nullable = false)
    private LocalDateTime date; // 일시
}

