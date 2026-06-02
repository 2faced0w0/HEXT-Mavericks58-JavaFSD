package com.roadready.service;

import com.roadready.dto.ReservationRequestDto;
import com.roadready.dto.ReservationResponseDto;
import com.roadready.dto.PaginatedResponse;
import org.springframework.data.domain.Pageable;

public interface ReservationService {
    ReservationResponseDto createReservation(ReservationRequestDto requestDTO);
    ReservationResponseDto cancelReservation(Integer reservationId);
    PaginatedResponse<ReservationResponseDto> getPastReservations(Integer customerId, Pageable pageable);
}
