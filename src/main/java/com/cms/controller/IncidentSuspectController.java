package com.cms.controller;

import com.cms.dto.IncidentSuspectReqDto;
import com.cms.dto.SuspectDtoV2;
import com.cms.dto.SuspectRespDto;
import com.cms.service.IncidentSuspectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incident/suspect")
@AllArgsConstructor
public class IncidentSuspectController {

    private final IncidentSuspectService incidentSuspectService;
    /*
     * Req:
     * suspect should be present in db (suspectId)
     * incident should be present in db (incidentId)
     * */
    @PostMapping("/add/{incidentId}/{suspectId}")
    public void add(@PathVariable int incidentId ,
                    @PathVariable int suspectId,
                    @Valid  @RequestBody IncidentSuspectReqDto dto){
        incidentSuspectService.add(incidentId,suspectId,dto);
    }

    /*
     * Resp:
     * incidentType
     * incidentStatus
     * incidentDetails
     * suspectName
     * suspectContact
     * suspectId
     * */
    @GetMapping("/by-incident/{incidentId}")
    public List<SuspectRespDto> getAllSuspectByIncident(@PathVariable int incidentId){

        return incidentSuspectService.getAllSuspectByIncident(incidentId);
    }

    /*
     * suspectName
     * suspectContact
     * suspectCity
     * incidentType
     * incidentStaus
     * officerName
     * stationTitle
     * */
    @GetMapping("/by-station/{stationId}")
    public List<SuspectDtoV2> getALLSuspectsByStation(@PathVariable int stationId){
        return incidentSuspectService.getALLSuspectsByStation(stationId);
    }
}

