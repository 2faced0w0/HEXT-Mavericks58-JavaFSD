package com.roadready.service;

import com.roadready.dto.ReservationRequestDto;
import com.roadready.dto.ReservationResponseDto;
import com.roadready.enums.BookingStatus;
import com.roadready.mapper.ReservationMapper;
import com.roadready.model.Customer;
import com.roadready.model.Reservation;
import com.roadready.model.Vehicle;
import com.roadready.repository.CustomerRepository;
import com.roadready.repository.ReservationRepository;
import com.roadready.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;
    private final ReservationMapper reservationMapper;

    @Override
    public ReservationResponseDto createReservation(ReservationRequestDto requestDto) {
        Customer customer = customerRepository
                .findById(requestDto.customerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        Vehicle vehicle = vehicleRepository
                .findById(requestDto.vehicleId())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        if (!Boolean.TRUE.equals(vehicle.getIsAvailable())) {
            throw new IllegalStateException("Vehicle is not available");
        }

        Reservation reservation = reservationMapper.mapDtoToEntity(requestDto, customer, vehicle);
        reservation.setBookingStatus(BookingStatus.CONFIRMED);
        Reservation savedReservation = reservationRepository.save(reservation);
        
        return reservationMapper.mapEntityToDto(savedReservation);
    }

    @Override
    public ReservationResponseDto cancelReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        reservation.setBookingStatus(BookingStatus.CANCELLED);
        Reservation updatedReservation = reservationRepository.save(reservation);

        return reservationMapper.mapEntityToDto(updatedReservation);
    }

    @Override
    public com.roadready.dto.PaginatedResponse<ReservationResponseDto> getPastReservations(Integer customerId, org.springframework.data.domain.Pageable pageable) {
        org.springframework.data.domain.Page<ReservationResponseDto> page = reservationRepository.findPastReservationsByCustomerId(customerId, pageable);
        return new com.roadready.dto.PaginatedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}
