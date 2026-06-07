package com.HireTrack.dto;

/*
Create a GET API to fetch the products based on Category name(Take it as request param)
- Create a Response DTO(ProductResponseDto) having
(productId,
 productName,
 categoryName,
 productPrice)

The response of the API should be List<ProductResponseDto>
Add pagination to the API
 */

public record ProductResponseDto(
         int productId,
         String productName,
         String categoryName,
         double productPrice
) {
}
