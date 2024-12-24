package shop.duction.be.item.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import shop.duction.be.community.entity.Community;
import shop.duction.be.item.enums.BiddingStatus;
import shop.duction.be.item.enums.RareTier;
import shop.duction.be.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private Integer startPrice;

    private Integer nowPrice;

    private Integer immediatePrice;

    @Column(nullable = false)
    private LocalDateTime end_time;

    @Column(name = "item_condition", nullable = false, length = 20)
    private String condition;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 20)
    private BiddingStatus biddingStatus;

    private Float rareScore;

    private RareTier rareTier;

    private LocalDateTime registDate;

    @Column(nullable = false)
    private Boolean isModified;

    @Column(nullable = false)
    private Boolean isChecked;

    @Column(nullable = false)
    private Integer reportedCount;

    @Column(nullable = false)
    private LocalDateTime registTime;

    private LocalDateTime endBidTime;

    @Column(nullable = false)
    private Integer totalView;

    @Column(nullable = false)
    private Integer totalBidding;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemImage> itemImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibitor_id")
    private User exhibitor;
}

