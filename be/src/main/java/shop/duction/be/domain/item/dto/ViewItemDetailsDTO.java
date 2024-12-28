package shop.duction.be.domain.item.dto;

import lombok.Builder;
import shop.duction.be.domain.item.enums.ItemCondition;
import shop.duction.be.domain.item.enums.RareTier;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ViewItemDetailsDTO(
        Integer communityId,
        String communityName,
        Integer itemId,
        String itemName,
        List<String> images,
        String description,
        String itemCondition,
        String rareTier,
        Integer startPrice,
        LocalDateTime endTime,
        Integer nowPrice,
        Integer totalView,
        Integer totalBidding,
        String exhibitorNickName,
        Float exhibitorRate,
        Integer immediatePrice
) {}
