package com.junit.junit_mockito.repository;

import com.junit.junit_mockito.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}