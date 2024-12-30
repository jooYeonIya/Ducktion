package shop.duction.be.domain.bidding.dto;

import lombok.Builder;

@Builder
public record BidRequestDTO(
        Integer price
) {}
