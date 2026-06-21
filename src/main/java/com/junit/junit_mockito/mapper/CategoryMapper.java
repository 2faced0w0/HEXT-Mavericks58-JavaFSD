package com.junit.junit_mockito.mapper;

import com.junit.junit_mockito.enums.CategoryReqDto;
import com.junit.junit_mockito.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public static Category toEntity(CategoryReqDto dto){
        Category category = new Category();
        category.setName(dto.name());
        category.setSeq(dto.seq());
        return category;
    }
}