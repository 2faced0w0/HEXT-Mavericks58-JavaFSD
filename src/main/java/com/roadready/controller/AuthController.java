package com.roadready.controller;

import com.roadready.dto.LoginResponseDto;
import com.roadready.dto.TokenDto;
import com.roadready.model.User;
import com.roadready.service.UserService;
import com.roadready.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtility jwtUtility;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public TokenDto signup(@RequestBody com.roadready.dto.SignupRequestDto dto) {
        User user = userService.createCustomer(dto, passwordEncoder.encode(dto.password()));
        String token = jwtUtility.generateToken(user.getEmail());
        String role = user.getRole().toString();
        return new TokenDto(user.getEmail(), role, token);
    }

    @GetMapping("/login")
    public TokenDto login(Principal principal) {
        User user = userService.findUserByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtUtility.generateToken(principal.getName());
        String role = user.getRole().toString();
        return new TokenDto(principal.getName(), role, token);
    }

    // this is for later
    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(Principal principal) {
        User user = userService.findUserByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        return new LoginResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().toString());
    }
}