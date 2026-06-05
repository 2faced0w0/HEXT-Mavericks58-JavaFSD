package com.roadready.repository;

import com.roadready.model.RentalAgent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RentalAgentRepository extends JpaRepository<RentalAgent, Integer> {


}
