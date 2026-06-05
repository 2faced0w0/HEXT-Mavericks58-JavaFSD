package com.HireTrack.dto;

import jakarta.validation.constraints.NotNull;

public record SignupRequestDto(
        @NotNull
        String name,
        @NotNull
        String email,
        @NotNull
        String password,
        @NotNull
        String Role
) {
}
