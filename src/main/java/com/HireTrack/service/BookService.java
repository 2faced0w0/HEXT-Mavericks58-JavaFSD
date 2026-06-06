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

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public List<BookResponseDto> getBooksByAuthorName(int page, int size, String authorname) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.findByAuthorName(authorname, pageable);

        return books.stream()
                .map(bookMapper::entityToDto)
                .toList();
    }
}
