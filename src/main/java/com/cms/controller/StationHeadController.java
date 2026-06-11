package com.cms.controller;

import com.cms.dto.CombinedStatDto;
import com.cms.service.StationHeadService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/station-head")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StationHeadController {

    private final StationHeadService stationHeadService;

    @GetMapping("/stats")
    public CombinedStatDto getCombinedStats(Principal principal){
        String stationHeadUsername = principal.getName();
        return stationHeadService.getCombinedStats(stationHeadUsername);
    }
}