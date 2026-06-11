package com.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record OfficerReqDto(
        @NotNull
        @NotBlank
        @Size(min = 4 , message = "Name should be at-least 4 characters")
        String name,
        @NotNull
        @NotBlank
        @Size(min = 4, message = "Username should be at-least 4 characters")
        String username
) {
}