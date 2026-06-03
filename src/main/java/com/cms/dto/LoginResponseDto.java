package com.cms.dto;

public record LoginResponseDto(
        int id,
        String username,
        String role
) {
}