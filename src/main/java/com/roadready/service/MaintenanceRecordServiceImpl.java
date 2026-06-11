package com.roadready.service;

import com.roadready.dto.MaintenanceRecordDto;
import com.roadready.dto.PaginatedResponse;
import com.roadready.repository.MaintenanceRecordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceRecordServiceImpl implements MaintenanceRecordService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final com.roadready.repository.VehicleRepository vehicleRepository;
    private final com.roadready.repository.RentalAgentRepository rentalAgentRepository;

    public MaintenanceRecordServiceImpl(MaintenanceRecordRepository maintenanceRecordRepository, 
            com.roadready.repository.VehicleRepository vehicleRepository, 
            com.roadready.repository.RentalAgentRepository rentalAgentRepository) {
        this.maintenanceRecordRepository = maintenanceRecordRepository;
        this.vehicleRepository = vehicleRepository;
        this.rentalAgentRepository = rentalAgentRepository;
    }

    @Override
    public PaginatedResponse<MaintenanceRecordDto> getMaintenanceRecords(Integer vehicleId, Integer agentId, Pageable pageable) {
        Page<MaintenanceRecordDto> page = maintenanceRecordRepository.findAllWithFilters(vehicleId, agentId, pageable);
        return new PaginatedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    @Override
    public MaintenanceRecordDto addMaintenanceRecord(com.roadready.dto.MaintenanceRequestDto dto) {
        com.roadready.model.Vehicle vehicle = vehicleRepository.findById(dto.vehicleId()).orElseThrow(() -> new RuntimeException("Vehicle not found"));
        com.roadready.model.RentalAgent agent = rentalAgentRepository.findById(dto.agentId()).orElseThrow(() -> new RuntimeException("Agent not found"));

        com.roadready.model.MaintenanceRecord record = new com.roadready.model.MaintenanceRecord();
        record.setVehicle(vehicle);
        record.setUpdatedByAgent(agent);
        record.setParticulars(dto.particulars());
        record.setDaysSinceLastService(dto.daysSinceLastService());

        // Update vehicle availability
        vehicle.setIsAvailable(false);
        vehicleRepository.save(vehicle);

        record = maintenanceRecordRepository.save(record);

        return new MaintenanceRecordDto(
                record.getId(),
                record.getParticulars(),
                record.getDaysSinceLastService(),
                agent.getId(),
                agent.getName(),
                vehicle.getVehicleId(),
                vehicle.getModel()
        );
    }
}
