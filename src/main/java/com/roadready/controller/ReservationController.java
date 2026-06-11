package com.roadready.controller;

import com.roadready.dto.ReservationRequestDto;
import com.roadready.dto.ReservationResponseDto;
import com.roadready.dto.PaginatedResponse;
import com.roadready.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.roadready.model.User;
import com.roadready.model.Customer;
import com.roadready.repository.CustomerRepository;

@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reservations")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final CustomerRepository customerRepository;

    @PostMapping("/add")
    public ResponseEntity<ReservationResponseDto> createReservation(@RequestBody ReservationRequestDto requestDto) {
        ReservationResponseDto response = reservationService.createReservation(requestDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<ReservationResponseDto> cancelReservation(@PathVariable Integer reservationId) {
        ReservationResponseDto response = reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{customerId}/past")
    public ResponseEntity<PaginatedResponse<ReservationResponseDto>> getPastReservations(@PathVariable Integer customerId, Pageable pageable) {
        PaginatedResponse<ReservationResponseDto> responses = reservationService.getPastReservations(customerId, pageable);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/my/past")
    public ResponseEntity<PaginatedResponse<ReservationResponseDto>> getMyPastReservations(@AuthenticationPrincipal User user, Pageable pageable) {
        Customer customer = customerRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Customer not found for the logged-in user"));
        PaginatedResponse<ReservationResponseDto> responses = reservationService.getPastReservations(customer.getId(), pageable);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/my/current")
    public ResponseEntity<PaginatedResponse<ReservationResponseDto>> getMyCurrentReservations(@AuthenticationPrincipal User user, Pageable pageable) {
        Customer customer = customerRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Customer not found for the logged-in user"));
        PaginatedResponse<ReservationResponseDto> responses = reservationService.getCurrentReservations(customer.getId(), pageable);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> getReservation(@PathVariable Integer reservationId) {
        ReservationResponseDto response = reservationService.getReservation(reservationId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> modifyReservation(@PathVariable Integer reservationId, @RequestBody ReservationRequestDto requestDto) {
        ReservationResponseDto response = reservationService.modifyReservation(reservationId, requestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{reservationId}/check-out")
    public ResponseEntity<ReservationResponseDto> checkOut(@PathVariable Integer reservationId, @RequestParam(required = false) String initialCondition) {
        return ResponseEntity.ok(reservationService.checkOut(reservationId, initialCondition));
    }

    @PostMapping("/{reservationId}/check-in")
    public ResponseEntity<ReservationResponseDto> checkIn(@PathVariable Integer reservationId, @RequestParam(required = false) String finalCondition) {
        return ResponseEntity.ok(reservationService.checkIn(reservationId, finalCondition));
    }
}
