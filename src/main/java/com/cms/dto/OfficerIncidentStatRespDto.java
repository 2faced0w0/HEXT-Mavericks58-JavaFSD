package com.cms.dto;

import java.util.List;

public record OfficerIncidentStatRespDto(
        String title,
        List<String> label,
        List<Long> data
) {
}