package shop.duction.be.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.duction.be.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

}
