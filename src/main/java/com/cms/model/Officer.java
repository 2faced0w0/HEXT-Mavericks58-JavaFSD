package com.cms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Officer { //o
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //findById

    @Column(nullable = false)
    private String name;

    @OneToOne
    private User user; //findByUserUsername(String username)

    @ManyToOne
    private Station station;

    private String idPath;
}