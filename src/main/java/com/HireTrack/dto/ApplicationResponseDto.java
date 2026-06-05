package com.HireTrack.dto;

import java.time.LocalDate;

public record ApplicationResponseDto(
        int id,
        LocalDate appliedAt,
        String jobTitle,
        String companyName
) {
}
