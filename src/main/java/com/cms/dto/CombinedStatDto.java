package com.cms.dto;

import java.util.List;

public record CombinedStatDto(
        List<String> label,
        List<Long> count
) {
}