package com.roadready.repository;

import com.roadready.model.Vehicle;
import java.math.BigDecimal;
import com.roadready.dto.VehicleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    @Query("""
            SELECT new com.roadready.dto.VehicleDto(
                v.vehicleId, 
                b.brandName, 
                a.id, 
                a.name, 
                v.model, 
                v.specifications, 
                v.pricingPerDay,
                v.isAvailable, 
                v.imageUrl, 
                v.location
            ) 
            FROM Vehicle v
            LEFT JOIN v.brand b
            LEFT JOIN v.agent a
            WHERE (:model IS NULL OR LOWER(v.model) LIKE LOWER(CONCAT('%', :model, '%'))) 
            AND (:maxPrice IS NULL OR v.pricingPerDay <= :maxPrice) 
            AND (:brandName IS NULL OR LOWER(b.brandName) LIKE LOWER(CONCAT('%', :brandName, '%'))) 
            AND (:location IS NULL OR LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%')))""")
    Page<VehicleDto> searchVehicles(@Param("model") String model,
                                 @Param("maxPrice") BigDecimal maxPrice,
                                 @Param("brandName") String brandName,
                                 @Param("location") String location,
                                 Pageable pageable
    );


}
