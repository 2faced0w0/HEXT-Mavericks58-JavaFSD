package com.cms.dto;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;

public record SuspectDtoV2(
        String suspectName,
        String suspectContact,
        String suspectCity,
        IncidentType incidentType,
        IncidentStatus incidentStaus,
        String officerName,
        String stationTitle
) {
}