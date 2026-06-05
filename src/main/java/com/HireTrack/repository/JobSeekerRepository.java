package com.HireTrack.repository;

import com.HireTrack.model.JobSeeker;
import com.HireTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobSeekerRepository extends JpaRepository<JobSeeker, Integer> {
    Optional<JobSeeker> findByUser(User user);
}
