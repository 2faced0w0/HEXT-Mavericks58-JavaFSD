package com.roadready.controller;

import com.roadready.dto.SignupRequestDto;
import com.roadready.model.Admin;
import com.roadready.service.AdminService;
import com.roadready.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AdminService adminService;

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody SignupRequestDto dto) {
        userService.createAdmin(dto, passwordEncoder.encode(dto.password()));
        return ResponseEntity.ok("Admin created successfully.");
    }

    @PostMapping("/create-agent")
    public ResponseEntity<String> createAgent(@RequestBody SignupRequestDto dto, Principal principal) {
        Admin admin = (Admin) adminService.loadUserByUsername(principal.getName());
        userService.createRentalAgent(dto, passwordEncoder.encode(dto.password()), admin);
        return ResponseEntity.ok("Rental Agent created successfully.");
    }
}
