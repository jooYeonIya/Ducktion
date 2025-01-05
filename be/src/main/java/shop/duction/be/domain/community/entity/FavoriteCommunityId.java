package shop.duction.be.domain.community.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FavoriteCommunityId implements Serializable {
    private Integer userId;
    private Integer communityId;
}

