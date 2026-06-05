package com.HireTrack.mapper;

import com.HireTrack.dto.BookResponseDto;
import com.HireTrack.model.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookResponseDto mapEntityToDto(Book book) {
        if (book == null) {
            return null;
        }
        return new BookResponseDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor() != null ? book.getAuthor().getName() : null,
                book.getAuthor() != null ? book.getAuthor().getEmail() : null
        );
    }
}
