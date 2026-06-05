package com.HireTrack.service;

import com.HireTrack.dto.BookResponseDto;
import com.HireTrack.mapper.BookMapper;
import com.HireTrack.model.Book;
import com.HireTrack.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public Page<BookResponseDto> getBooksByAuthorName(String authorname, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.findByAuthor_Name(authorname, pageable);

        return books.map(bookMapper::mapEntityToDto);
    }
}
