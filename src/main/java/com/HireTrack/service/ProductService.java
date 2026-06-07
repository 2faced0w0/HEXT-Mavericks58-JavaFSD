package com.HireTrack.service;

import com.HireTrack.dto.ProductResponseDto;
import com.HireTrack.mapper.ProductMapper;
import com.HireTrack.model.Product;
import com.HireTrack.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductResponseDto> getProductsByCategory(int page, int size, String category) {
        Pageable pageable= PageRequest.of(page,size);
        List<Product> products=productRepository.findProductsByCategoryName(category, pageable);

        return products
                .stream()
                .map(ProductMapper::entityToDto)
                .toList();
    }
}
