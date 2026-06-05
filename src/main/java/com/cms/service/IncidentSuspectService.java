package com.cms.service;

import com.cms.dto.IncidentSuspectReqDto;
import com.cms.dto.SuspectDtoV2;
import com.cms.dto.SuspectRespDto;
import com.cms.mapper.IncidentSuspectMapper;
import com.cms.mapper.SuspectMapper;
import com.cms.model.Incident;
import com.cms.model.IncidentSuspect;
import com.cms.model.Suspect;
import com.cms.repository.IncidentSuspectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IncidentSuspectService {

    private final IncidentService incidentService;
    private final SuspectService suspectService;
    private final IncidentSuspectRepository incidentSuspectRepository;
    private final SuspectMapper suspectMapper;

    public void add(int incidentId, int suspectId, IncidentSuspectReqDto dto) {
        // Step 1: Fetch Incident by given incidentId
        Incident incident = incidentService.getById(incidentId);
        // Step 2: Fetch Suspect by given suspectId
        Suspect suspect = suspectService.getById(suspectId);
        // Step 3: Map dto to IncidentSuspect entity
        IncidentSuspect incidentSuspect = IncidentSuspectMapper.dtoToEntity(dto);
        // Step 4: attach incident and suspect from step 1 and 2 to IncidentSuspect entity of step 3
        incidentSuspect.setIncident(incident);
        incidentSuspect.setSuspect(suspect);
        // Step 5: save IncidentSuspect entity in DB
        incidentSuspectRepository.save(incidentSuspect);
    }

    public List<SuspectRespDto> getAllSuspectByIncident(int incidentId) {
        // Step 1: Get Incident by given Id
        Incident incident =  incidentService.getById(incidentId);
        // Step 2: Write JPQL for fetching suspects for given incident
        List<Suspect> list = incidentSuspectRepository.getAllSuspectByIncident(incidentId);
        /* issue:
         * I have List<Suspect> and can easily convert to DTO
         * Each dto has incident details too
         * so the strategy is to use lambda and pass incident object to mapper
         * */
        // Step 3: Map List<Suspect> to List<SuspectRespDto> using SuspectMapper
        return list
                .stream()
                .map((s)-> suspectMapper.mapEntityToDto(s,incident))
                .toList();
        /*
         * In the above map fn, i am passing incident object as an extra as dto needs some incident info.
         * using lambda exp, we can pass these extra objects to mapper.
         * ex. mapEntityToDto(s,incident)
         * */
    }

//    public List<SuspectDtoV2> getALLSuspectsByStation(int stationId) {
//        return incidentSuspectRepository.getAllSuspectsByStation(stationId);
//    }
}