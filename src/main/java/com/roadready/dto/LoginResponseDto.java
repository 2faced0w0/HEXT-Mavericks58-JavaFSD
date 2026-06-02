package com.roadready.dto;

public record LoginResponseDto(
                Integer id,
                String username,
                String email,
                String role) {
}