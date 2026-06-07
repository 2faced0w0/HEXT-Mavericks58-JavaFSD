package com.HireTrack.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private double price;
    private int stockCount;

    @ManyToOne
    private Category category;
}