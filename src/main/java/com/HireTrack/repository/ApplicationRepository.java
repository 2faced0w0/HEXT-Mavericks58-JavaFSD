package com.HireTrack.repository;

import com.HireTrack.model.Application;
import com.HireTrack.model.JobSeeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    Page<Application> findByJobSeeker(JobSeeker jobSeeker, Pageable pageable);

    @Query("SELECT a FROM Application a WHERE a.jobSeeker.id = :jobSeekerId")
    Page<Application> findByJobSeekerId(@Param("jobSeekerId") int jobSeekerId, Pageable pageable);
}
