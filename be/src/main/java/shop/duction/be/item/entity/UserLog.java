package shop.duction.be.item.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "UserLog")
public class UserLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId; // 로그 ID

    @Column(nullable = false)
    private Integer itemId; // 상품 ID

    @Column(nullable = false)
    private Integer userId; // 사용자 ID

    @Column(nullable = false)
    private Integer views; // 조회수

    @Column(nullable = false)
    private LocalDateTime date; // 일시
}

