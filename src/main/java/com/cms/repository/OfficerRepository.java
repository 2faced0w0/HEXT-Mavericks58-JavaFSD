package com.cms.repository;

import com.cms.dto.IncidentOfficerStatJpqlDto;
import com.cms.model.Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OfficerRepository extends JpaRepository<Officer,Integer> {

    Officer findByUserUsername(String username);

    @Query("""
            select o
            from Officer o
            where o.station.stationHead.user.username=?1
            """)
    List<Officer> getOfficersByStationHead(String stationHeadUsername);

    @Query("""
            select o from Officer o
            join Incident i ON o.id=i.officer.id
            where i.id = ?1
            """) // since we wanted to go backwards from Officer to Incident, we used join
    Officer getByIncidentId(int incidentId);

    @Query("""
            select i.officer.name as name, count(i.id) as numberOfIncidents
            from Incident i
            group by i.officer.id
            """)
    List<IncidentOfficerStatJpqlDto> incidentByOfficerStat();
}
// select o from Officer o where o.user.username=?1

/*
    Incident <- Officer --> JOIN with ON
    select o from Incident i join i.officer o (JOIN without ON)
* */