package com.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record OfficerReqDto(
        @NotNull
        @NotBlank
        String name,
        @NotNull
        @NotBlank
        @Size(min = 4)
        String username,
        @NotNull
        @NotBlank
        String password
) {
}