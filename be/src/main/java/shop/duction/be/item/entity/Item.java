package shop.duction.be.item.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import shop.duction.be.community.entity.Community;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private Integer startPrice;

    @Column(nullable = false)
    private Integer immediatePrice;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 20)
    private String condition;

    @Column(nullable = false, length = 20)
    private String auctionState;

    @Column(nullable = false)
    private LocalDateTime registDate;

    private LocalDateTime auctionEnd;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemImage> itemImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;
}

