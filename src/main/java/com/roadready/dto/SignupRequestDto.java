package com.roadready.dto;

public record SignupRequestDto(
        String name,
        String email,
        String password,
        String phoneNumber
) {
}
