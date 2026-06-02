package com.roadready.controller;

import com.roadready.dto.ReservationRequestDto;
import com.roadready.dto.ReservationResponseDto;
import com.roadready.dto.PaginatedResponse;
import com.roadready.service.ReservationService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDto> createReservation(@RequestBody ReservationRequestDto requestDto) {
        ReservationResponseDto response = reservationService.createReservation(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<ReservationResponseDto> cancelReservation(@PathVariable Integer reservationId) {
        ReservationResponseDto response = reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}/past")
    public ResponseEntity<PaginatedResponse<ReservationResponseDto>> getPastReservations(@PathVariable Integer customerId, Pageable pageable) {
        PaginatedResponse<ReservationResponseDto> responses = reservationService.getPastReservations(customerId, pageable);
        return ResponseEntity.ok(responses);
    }
}
