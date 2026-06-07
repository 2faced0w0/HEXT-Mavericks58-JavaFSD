package com.HireTrack.repository;

import com.HireTrack.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findProductsByCategoryName(String categoryName, Pageable pageable);
}
