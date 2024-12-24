package shop.duction.be.community.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import shop.duction.be.item.entity.Item;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Community")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer communityId;

    @Column(nullable = false, length = 40)
    private String name;

    @Column(nullable = false, length = 10)
    private String firstWord;

    @Column(nullable = false)
    private LocalDateTime registTime;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteCommunity> favoriteCommunities;
}

