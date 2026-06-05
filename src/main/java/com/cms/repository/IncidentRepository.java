package com.cms.repository;

import com.cms.dto.IncidentTypeStatDto;
import com.cms.enums.IncidentType;
import com.cms.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Integer> {
    /*
    IncidentRepository now has
    - findAll
    - findById
    - save
    - delete
    * */

    List<Incident> findByIncidentType(IncidentType type);
    /* findBy : select * from Incident where incidentType=?1 */

    List<Incident> findByOfficerId(int id);

    List<Incident> findByOfficerUserUsername(String officerUsername);

    @Query("""
            select i
            from Incident i
            where i.officer.user.username=?1
            """)
    List<Incident> getByOfficerUserUsernameJpql(String officerUsername);

    @Query("""
            select i.incidentType as type, count(i.id) as numberOfIncidents
            from Incident i
            group by i.incidentType
            """)
    List<IncidentTypeStatDto> getIncidentStatByType();
    /* findBy : select * from Incident where officer.id=?1 */
}