package shop.duction.be.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import shop.duction.be.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "community_create_request")
public class CommunityCreateRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "request_reason")
    private String requestReason;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

