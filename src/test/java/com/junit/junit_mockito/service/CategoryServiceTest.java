package com.junit.junit_mockito.service;

import com.junit.junit_mockito.enums.CategoryReqDto;
import com.junit.junit_mockito.exceptions.ResourceNotFoundException;
import com.junit.junit_mockito.model.Category;
import com.junit.junit_mockito.repository.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    // Which repository(s) are u mocking
    @Mock
    private CategoryRepository categoryRepository;

    // In which service are u mocking
    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private Category category1;
    private Category category2;
    // Common Sample data for all test cases in CategoryService
    // Sequence:- Sample data loads - Test case runs - Sample data deloads
    @BeforeEach
    public void sampleData(){
        category = new Category();
        category.setId(1);
        category.setName("mobiles");
        category.setSeq(1);

        category1 = new Category();
        category1.setId(2);
        category1.setName("laptops");
        category1.setSeq(2);
    }

    @Test
    public void getAllCategories_MustReturnSomething(){
        when(categoryRepository.findAll()).thenReturn(List.of(category,category1));
        List<Category> actualCall = categoryService.getAll();

        assertThat(actualCall).hasSize(2);
        assertThat(actualCall.getFirst().getName()).isEqualToIgnoringCase("mobiles");
        assertThat(actualCall.get(1).getName()).isEqualToIgnoringCase("laptops");
    }

    @Test
    public void getAllCategories_ReturnsEmptyList(){
        when(categoryRepository.findAll()).thenReturn(List.of());
        // Actual Call
        List<Category> actualCall = categoryService.getAll();

        assertThat(actualCall).hasSize(0);
        assertThat(actualCall).isEmpty();
    }

    @Test
    void getById_categoryExists(){
        when(categoryRepository.findById(100)).thenReturn(Optional.of(category));
        when(categoryRepository.findById(200)).thenReturn(Optional.of(category1));

        assertThat(categoryService.getById(100).getId()).isEqualTo(1);
        assertThat(categoryService.getById(200).getId()).isEqualTo(2);

        assertThat(categoryService.getById(100).getName()).isEqualTo("mobiles");
        assertThat(categoryService.getById(200).getName()).isEqualTo("laptops");
    }

    @Test
    void getById_categoryDoesNotExist(){
        when(categoryRepository.findById(100)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> categoryService.getById(100))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Given id invalid");
    }

    @Test
    void addCategory_mustSaveAndReturnCategory(){
        when(categoryRepository.findById(100)).thenReturn(Optional.of(category2));

        CategoryReqDto dto=new CategoryReqDto("headphones", 3);
        assertThat(categoryService.addCategory(dto).getName()).isEqualTo(category2.getName());
        assertThat(categoryService.addCategory(dto).getSeq()).isEqualTo(category2.getSeq());

        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void deleteCategory_mustDeleteandReturnNothing(){
        when(categoryRepository.findById(100)).thenReturn(Optional.of(category));


    }
}