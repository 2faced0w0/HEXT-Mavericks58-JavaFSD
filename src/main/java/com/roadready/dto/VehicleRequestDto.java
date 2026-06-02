package com.roadready.dto;

import java.math.BigDecimal;

public record VehicleRequestDto(
        Integer brandId,
        String model,
        String specifications,
        BigDecimal pricingPerDay,
        String imageUrl,
        String location,
        Integer agentId
) {
}
