package com.HireTrack.mapper;

import com.HireTrack.dto.ProductResponseDto;
import com.HireTrack.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public static ProductResponseDto entityToDto(Product product){
        if(product==null){
            return null;
        }

        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getCategory().getName(),
                product.getPrice()
        );
    }
}
