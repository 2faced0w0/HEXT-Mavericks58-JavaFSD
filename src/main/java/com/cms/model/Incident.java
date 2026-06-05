package com.cms.model;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
public class Incident { //i
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // findById(id)

    @Enumerated(EnumType.STRING)
    private IncidentType incidentType; // findByIncidentType(type) -- List<Incident>

    private String progressDetails;

    @Enumerated(EnumType.STRING)
    private IncidentStatus incidentStatus; //findByIncidentStatus(status) -- List<Incident>

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @ManyToOne // eager loading -- fetch type
    private Officer officer; //findByOfficerId(id) -- List<Incident>

    /*
    @ManyToMany
    @JoinTable(name = "incident_suspect")
    private List<Suspect> suspects;
    */

}