package com.HireTrack.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String summary;
    @ManyToOne
    private Author author;
}