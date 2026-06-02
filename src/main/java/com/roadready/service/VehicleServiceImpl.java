package com.roadready.service;

import com.roadready.dto.VehicleDto;
import java.math.BigDecimal;
import com.roadready.dto.PaginatedResponse;
import com.roadready.mapper.VehicleMapper;
import com.roadready.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    public VehicleServiceImpl(VehicleRepository vehicleRepository, VehicleMapper vehicleMapper) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleMapper = vehicleMapper;
    }

    @Override
    public PaginatedResponse<VehicleDto> searchVehicles(String model, BigDecimal maxPrice, String brandName, String location, Pageable pageable) {
        Page<VehicleDto> vehiclePage = vehicleRepository.searchVehicles(model, maxPrice, brandName, location, pageable);
        return new PaginatedResponse<>(
                vehiclePage.getContent(),
                vehiclePage.getNumber(),
                vehiclePage.getSize(),
                vehiclePage.getTotalElements(),
                vehiclePage.getTotalPages(),
                vehiclePage.isLast()
        );
    }
}
