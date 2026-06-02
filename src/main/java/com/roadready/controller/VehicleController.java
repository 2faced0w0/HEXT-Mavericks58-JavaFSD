package com.roadready.controller;

import com.roadready.dto.VehicleDto;
import java.math.BigDecimal;
import com.roadready.dto.PaginatedResponse;
import com.roadready.service.VehicleService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/search")
    public ResponseEntity<PaginatedResponse<VehicleDto>> searchVehicles(
            @RequestParam(required = false) String model,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String brandName,
            @RequestParam(required = false) String location,
            Pageable pageable) {
        PaginatedResponse<VehicleDto> vehicles = vehicleService.searchVehicles(model, maxPrice, brandName, location, pageable);
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/add")
    public ResponseEntity<VehicleDto> addVehicle(@RequestBody com.roadready.dto.VehicleRequestDto dto) {
        VehicleDto createdVehicle = vehicleService.addVehicle(dto);
        return ResponseEntity.ok(createdVehicle);
    }
}
