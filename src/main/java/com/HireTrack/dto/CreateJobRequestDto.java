package com.HireTrack.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateJobRequestDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        String location,
        @NotBlank
        Double salary
) {
}
