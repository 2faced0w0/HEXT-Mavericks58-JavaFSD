package com.roadready.controller;

import com.roadready.dto.SignupRequestDto;
import com.roadready.model.Admin;
import com.roadready.model.RentalAgent;
import com.roadready.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody SignupRequestDto dto) {
        userService.createAdmin(dto, passwordEncoder.encode(dto.password()));
        return ResponseEntity.ok("Admin created successfully.");
    }

    @PostMapping("/create-agent")
    public ResponseEntity<String> createAgent(@RequestBody SignupRequestDto dto, Principal principal) {
        Admin admin = (Admin) userService.findUserByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        userService.createRentalAgent(dto, passwordEncoder.encode(dto.password()), admin);
        return ResponseEntity.ok("Rental Agent created successfully.");
    }
}
