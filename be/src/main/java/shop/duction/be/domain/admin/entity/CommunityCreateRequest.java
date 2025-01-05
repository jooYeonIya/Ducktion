package shop.duction.be.domain.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import shop.duction.be.domain.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityCreateRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestId;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String requestReason;

    @Column(nullable = false)
    private LocalDateTime requestTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

