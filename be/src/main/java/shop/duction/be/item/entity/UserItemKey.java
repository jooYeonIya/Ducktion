package shop.duction.be.item.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserItemKey implements Serializable {
    private Integer itemId; // 상품 ID
    private Integer userId; // 사용자 ID
}