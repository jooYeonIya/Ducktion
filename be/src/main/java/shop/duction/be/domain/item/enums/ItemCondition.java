package shop.duction.be.domain.item.enums;

import java.util.Arrays;

public enum ItemCondition {
    NEW,    // 새상품
    NO_USE, // 사용감 없음
    LESS_USE,   // 사용감 적음
    MANY_USE,   // 사용감 많음
    BROKEN;  // 고장/파손

    public static ItemCondition fromString(String value) {
        return Arrays.stream(ItemCondition.values())
                .filter(condition -> condition.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        String.format("Invalid ItemCondition value: '%s'. Allowed values are: %s",
                                value, Arrays.toString(ItemCondition.values()))
                ));
    }
};
