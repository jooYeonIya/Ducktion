package shop.duction.be.domain.item.dto;

import lombok.Builder;

@Builder
public record BidRequestDTO(
        Integer price
) {}
