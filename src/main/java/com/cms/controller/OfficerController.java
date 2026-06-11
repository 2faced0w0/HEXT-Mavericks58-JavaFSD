package com.cms.controller;

import com.cms.dto.OfficerIncidentStatRespDto;
import com.cms.dto.OfficerReqDto;
import com.cms.dto.OfficerResponseDto;
import com.cms.service.OfficerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/officer")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerController {

    private final OfficerService officerService;

    /*
List of Officers:
    officerId
    officerName
    stationTitle
    stationHeadId
    stationHeadName
* */
    @GetMapping("/by-station-head")
    public List<OfficerResponseDto> getOfficersByStationHead(@RequestParam  String stationHeadUsername){
        return officerService.getOfficersByStationHead(stationHeadUsername);
    }
    /*
     * name, username, password
     * */
    @PostMapping("/add")
    public void postOfficer(@Valid @RequestBody OfficerReqDto officerReqDto){
        officerService.postOfficer(officerReqDto);
    }

    @GetMapping("/by-incident/stat")
    public OfficerIncidentStatRespDto incidentByOfficerStat(){
        return officerService.incidentByOfficerStat();
    }

    @PostMapping("/id/upload")
    public void upload(Principal principal,
                       @RequestParam("file") MultipartFile file) throws IOException {
        //file is the actual doc/image user is uploading.

        String username = principal.getName();
        officerService.upload(username, file);
    }
}

