package com.HireTrack.dto;

public record JobResponseDto(
        int id,
        String jobtitle,
        String description,
        String companyName,
        String location,
        Double salary
        ) {
}