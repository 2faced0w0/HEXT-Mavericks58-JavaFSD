package com.cms.repository;

import com.cms.model.Incident;
import com.cms.model.Officer;
import com.cms.model.StationHead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationHeadRepository extends JpaRepository<StationHead, Integer> {

    @Query("""
            select i from Incident i
            JOIN i.officer o
            JOIN o.station s
            JOIN s.stationHead sh
            JOIN sh.user u
            where u.username = ?1
            """)
    List<Incident> getAllIncidentsByStationHead(String stationHeadUsername);

    @Query("""
            select o from Officer o
            JOIN o.station s
            JOIN s.stationHead sh
            JOIN sh.user u
            where u.username = ?1
            """)
    List<Officer> getAllOfficers(String stationHeadUsername);
}