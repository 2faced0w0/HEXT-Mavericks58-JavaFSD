package com.junit.junit_mockito.service;

import com.junit.junit_mockito.enums.CategoryReqDto;
import com.junit.junit_mockito.exceptions.ResourceNotFoundException;
import com.junit.junit_mockito.mapper.CategoryMapper;
import com.junit.junit_mockito.model.Category;
import com.junit.junit_mockito.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category addCategory(CategoryReqDto dto) {
        Category category = CategoryMapper.toEntity(dto);

        return categoryRepository.save(category);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Given id invalid"));
    }

    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }
}