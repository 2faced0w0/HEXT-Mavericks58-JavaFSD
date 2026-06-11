package com.roadready.controller;

import com.roadready.dto.VehicleDto;
import java.math.BigDecimal;
import com.roadready.dto.PaginatedResponse;
import com.roadready.service.VehicleService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    private final com.roadready.repository.VehicleRepository vehicleRepository;

    public VehicleController(VehicleService vehicleService, com.roadready.repository.VehicleRepository vehicleRepository) {
        this.vehicleService = vehicleService;
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<PaginatedResponse<VehicleDto>> searchVehicles(
            @RequestParam(required = false) String model,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String brandName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime endDate,
            @RequestParam(required = false) String vehicleType,
            @RequestParam(required = false) String subType,
            Pageable pageable) {
        PaginatedResponse<VehicleDto> vehicles = vehicleService.searchVehicles(model, maxPrice, brandName, location, startDate, endDate, vehicleType, subType, pageable);
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/add")
    public ResponseEntity<VehicleDto> addVehicle(@RequestBody com.roadready.dto.VehicleRequestDto dto) {
        VehicleDto createdVehicle = vehicleService.addVehicle(dto);
        return ResponseEntity.ok(createdVehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateVehicle(@PathVariable Integer id, @RequestBody com.roadready.dto.VehicleRequestDto dto) {
        com.roadready.model.Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        vehicle.setModel(dto.model());
        vehicle.setPricingPerDay(dto.pricingPerDay());
        vehicle.setLocation(dto.location());
        vehicle.setVehicleType(dto.vehicleType());
        vehicle.setSubType(dto.subType());
        vehicleRepository.save(vehicle);
        return ResponseEntity.ok("Vehicle updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Integer id) {
        vehicleRepository.deleteById(id);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Integer id, @RequestParam boolean isAvailable) {
        com.roadready.model.Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        vehicle.setIsAvailable(isAvailable);
        vehicleRepository.save(vehicle);
        return ResponseEntity.ok("Vehicle status updated to " + isAvailable);
    }
}
