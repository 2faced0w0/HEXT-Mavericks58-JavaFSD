package com.cms.dto;

import com.cms.enums.IncidentType;

public record IncidentTypeStatDto(
        IncidentType type,
        long numberOfIncidents
) {
}