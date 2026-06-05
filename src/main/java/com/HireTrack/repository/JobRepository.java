package com.HireTrack.repository;

import com.HireTrack.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    Page<Job> findAll(Pageable pageable);

    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Job> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);

    Page<Job> findByEmployerCompanyNameContainingIgnoreCase(String companyName, Pageable pageable);

    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);
}
