package shop.duction.be.domain.item.dto;

import java.time.LocalDateTime;
import java.util.List;
import shop.duction.be.domain.community.entity.Community;
import shop.duction.be.domain.item.enums.ItemCondition;
import shop.duction.be.domain.user.entity.User;

public record RegistItemRequestDTO(
  String name,
  List<String> itemImages,
  String description,
  String itemCondition,
  Float rareScore,
  Integer startPrice,
  LocalDateTime endTime,
  Integer immediatePrice,
  Integer communityId
) {

}
