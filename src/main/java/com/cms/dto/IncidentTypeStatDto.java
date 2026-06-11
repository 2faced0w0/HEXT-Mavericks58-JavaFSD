package com.cms.dto;

import com.cms.enums.IncidentType;

public record IncidentTypeStatDto(
        IncidentType type,
        Long numberOfIncidents

) {
}