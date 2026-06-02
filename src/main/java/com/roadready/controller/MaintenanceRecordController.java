package com.roadready.controller;

import com.roadready.dto.MaintenanceRecordDto;
import com.roadready.dto.PaginatedResponse;
import com.roadready.service.MaintenanceRecordService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceRecordService;

    public MaintenanceRecordController(MaintenanceRecordService maintenanceRecordService) {
        this.maintenanceRecordService = maintenanceRecordService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<PaginatedResponse<MaintenanceRecordDto>> getMaintenanceRecords(
            @RequestParam(required = false) Integer vehicleId,
            @RequestParam(required = false) Integer agentId,
            Pageable pageable) {
        
        PaginatedResponse<MaintenanceRecordDto> records = maintenanceRecordService.getMaintenanceRecords(vehicleId, agentId, pageable);
        return ResponseEntity.ok(records);
    }
}
