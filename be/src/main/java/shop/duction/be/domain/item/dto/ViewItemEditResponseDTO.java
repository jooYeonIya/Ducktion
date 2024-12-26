package shop.duction.be.domain.item.dto;

import java.time.LocalDateTime;
import java.util.List;
import shop.duction.be.domain.item.enums.ItemCondition;

public record ViewItemEditResponseDTO(
        String itemName,
        List<String> imageUrls,
        String description,
        ItemCondition itemCondition,
        Float rareScore,
        Integer startPrice,
        LocalDateTime endBidTime,
        Integer immediatePrice
) {}
