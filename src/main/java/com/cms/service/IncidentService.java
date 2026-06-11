package com.cms.service;

import com.cms.dto.*;
import com.cms.enums.IncidentType;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.IncidentMapper;
import com.cms.model.Incident;

import com.cms.model.Officer;
import com.cms.repository.IncidentRepository;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/*
To create a bean in spring boot we can use following annotations
for services class use @Service
for repositories , use @Repository
for all other classes including util use @Component
* */
@Service
@AllArgsConstructor
public class IncidentService {

    private static final Logger logger = LoggerFactory.getLogger(IncidentService.class);

    private final IncidentRepository incidentRepository;
    private final IncidentMapper incidentMapper;
    private final OfficerService officerService;

    public List<Incident> getAll() {
        return incidentRepository.findAll();
    }

    public void addIncident(IncidentDto dto) {
        // Map the dto to Entity
        Incident incident = incidentMapper.mapDtoToEntity(dto);
        // Save the Entity
        incidentRepository.save(incident);
    }

    public Incident getById(int id) {
        return incidentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid incident id"));
    }

    public void deleteById(int id) {
        getById(id); // validation
        incidentRepository.deleteById(id);
    }


    public IncidentRespDto getAllWithPagination(int page, int size) {
        // prepare the Pageable object using PageRequest.
        Pageable pageable =  PageRequest.of(page,size);
        Page<Incident> pages =  incidentRepository.findAll(pageable);
        return incidentMapper.mapEntityToDto(pages);
    }

    public List<Incident> getByIncidentType(IncidentType incidentType) {
        return incidentRepository.findByIncidentType(incidentType);
    }

    public void addIncidentWithOfficer(IncidentDto dto, int officerId) {
        // fetch Officer from DB based on given Id
        Officer officer = officerService.getById(officerId);
        // Map the dto to Entity
        Incident incident = incidentMapper.mapDtoToEntity(dto);
        // Attach officer to Incident
        incident.setOfficer(officer);
        // Save the Entity
        incidentRepository.save(incident);
    }

    public List<IncidentOfficerDto> getIncidentByOfficerId(int officerId) {
        // 1. write sql/jpql for this op
        // 2. write a derived query for this op
        officerService.getById(officerId);

        List<Incident>  list =  incidentRepository.findByOfficerId(officerId);
        //convert list<Incident> into List<IncidentOfficerDto>

        return list.
                stream()
                .map(incidentMapper :: getDtoForEntity)
                .toList(); //each incident will be converted into IncidentOfficerDto
    }

    public List<IncidentOfficerDto> getIncidentByOfficerUsername(String officerUsername) {
        officerService.getByUsername(officerUsername);
        // List<Incident>  list = incidentRepository.findByOfficerUserUsername(officerUsername);
        List<Incident>  list = incidentRepository.getByOfficerUserUsernameJpql(officerUsername);
        return list.
                stream()
                .map(incidentMapper :: getDtoForEntity)
                .toList(); //each incident will be converted into IncidentOfficerDto
    }

    public OfficerIncidentStatRespDto getIncidentStatByType(String stationHeadUsername) {
        List<IncidentTypeStatDto> list = incidentRepository.getIncidentStatByType(stationHeadUsername);

        logger.info(list.toString());
        //convert from List<IncidentTypeStatDto> to OfficerIncidentStatRespDto
        List<String> typeList =  list.stream()
                .map(IncidentTypeStatDto :: type)
                .map(Enum::toString)
                .toList();

        List<Long> listNumber = list.stream()
                .map(IncidentTypeStatDto :: numberOfIncidents)
                .toList();

        return new OfficerIncidentStatRespDto(
                "IncidentType Stats",
                typeList,
                listNumber
        );

    }
}
/*
Optional<T> is a wrapper
which says,i may or may not give u T
 */