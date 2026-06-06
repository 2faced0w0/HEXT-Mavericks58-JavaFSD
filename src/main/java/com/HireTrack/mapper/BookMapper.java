package com.HireTrack.mapper;

import com.HireTrack.dto.BookResponseDto;
import com.HireTrack.model.Author;
import com.HireTrack.model.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    public BookResponseDto entityToDto(Book book) {
        if (book == null) {
            return null;
        }
        return new BookResponseDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor() != null ? book.getAuthor().getName() : null,
                book.getAuthor() != null ? book.getAuthor().getEmail() : null);
    }

    public Book dtoToEntity(BookResponseDto dto) {
        if (dto == null) {
            return null;
        }
        Author author = new Author();
        author.setEmail(dto.authorEmail());
        author.setName(dto.authorName());

        Book book = new Book();
        book.setId(dto.bookId());
        book.setTitle(dto.title());
        book.setAuthor(author);
        return book;
    }
}
