package com.roadready.service;

import com.roadready.dto.VehicleDto;
import java.math.BigDecimal;
import com.roadready.dto.PaginatedResponse;
import com.roadready.mapper.VehicleMapper;
import com.roadready.repository.BrandRepository;
import com.roadready.repository.RentalAgentRepository;
import com.roadready.repository.VehicleRepository;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;
    private final BrandRepository brandRepository;
    private final RentalAgentRepository rentalAgentRepository;

    @Override
    public VehicleDto addVehicle(com.roadready.dto.VehicleRequestDto dto) {
        com.roadready.model.Brand brand = brandRepository.findById(dto.brandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        com.roadready.model.RentalAgent agent = rentalAgentRepository.findById(dto.agentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        com.roadready.model.Vehicle vehicle = new com.roadready.model.Vehicle();
        vehicle.setBrand(brand);
        vehicle.setModel(dto.model());
        vehicle.setSpecifications(dto.specifications());
        vehicle.setPricingPerDay(dto.pricingPerDay());
        vehicle.setImageUrl(dto.imageUrl());
        vehicle.setLocation(dto.location());
        vehicle.setAgent(agent);
        vehicle.setIsAvailable(true);
        vehicle.setVehicleType(dto.vehicleType());
        vehicle.setSubType(dto.subType());

        vehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.mapEntityToDto(vehicle);
    }

    @Override
    public PaginatedResponse<VehicleDto> searchVehicles(String model, BigDecimal maxPrice, String brandName,
            String location, java.time.LocalDateTime startDate, java.time.LocalDateTime endDate, String vehicleType, String subType, Pageable pageable) {
        Page<VehicleDto> vehiclePage = vehicleRepository.searchVehicles(model, maxPrice, brandName, location, startDate, endDate, vehicleType, subType, pageable);
        return new PaginatedResponse<>(
                vehiclePage.getContent(),
                vehiclePage.getNumber(),
                vehiclePage.getSize(),
                vehiclePage.getTotalElements(),
                vehiclePage.getTotalPages(),
                vehiclePage.isLast());
    }
}
