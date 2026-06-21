package com.junit.junit_mockito.controller;

import com.junit.junit_mockito.enums.CategoryReqDto;
import com.junit.junit_mockito.model.Category;
import com.junit.junit_mockito.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/add")
    public Category addCategory(@RequestBody CategoryReqDto dto){
        return categoryService.addCategory(dto);
    }

    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }
}