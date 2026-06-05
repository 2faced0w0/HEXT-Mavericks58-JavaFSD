package com.HireTrack.repository;

import com.HireTrack.model.Employer;
import com.HireTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    Optional<Employer> findByUser(User user);
}
