package com.roadready.controller;

import com.roadready.model.Promotion;
import com.roadready.repository.PromotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/promotions")
@AllArgsConstructor
public class PromotionController {

    private final PromotionRepository promotionRepository;

    @GetMapping
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        return ResponseEntity.ok(promotionRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Promotion> addPromotion(@RequestBody Promotion promotion) {
        if(promotion.getCreatedAt() == null) {
            promotion.setCreatedAt(java.time.Instant.now());
        }
        return ResponseEntity.ok(promotionRepository.save(promotion));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePromotion(@PathVariable Integer id) {
        promotionRepository.deleteById(id);
        return ResponseEntity.ok("Promotion deleted.");
    }
}
