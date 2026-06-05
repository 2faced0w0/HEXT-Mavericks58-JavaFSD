package com.HireTrack.dto;

import java.util.List;

public record PaginatedResponseDto<T>(
        List<T> content,
        int page,
        int size,
        int totalpages
) {
}
