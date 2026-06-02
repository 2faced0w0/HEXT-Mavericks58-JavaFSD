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

    public MaintenanceRecordServiceImpl(MaintenanceRecordRepository maintenanceRecordRepository) {
        this.maintenanceRecordRepository = maintenanceRecordRepository;
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
}
