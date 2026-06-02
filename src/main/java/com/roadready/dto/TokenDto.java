package com.roadready.dto;

public record TokenDto(
        String email,
        String role,
        String token
) {
}
