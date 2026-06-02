package com.roadready.service;

import com.roadready.dto.PaginatedResponse;
import com.roadready.dto.VehicleDto;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;

public interface VehicleService {
    PaginatedResponse<VehicleDto> searchVehicles(
            String model,
            BigDecimal maxPrice,
            String brandName,
            String location,
            Pageable pageable);
}
