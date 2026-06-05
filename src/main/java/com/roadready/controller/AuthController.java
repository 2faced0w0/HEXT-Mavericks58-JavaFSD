package com.roadready.controller;

import com.roadready.dto.SignupRequestDto;
import com.roadready.dto.TokenDto;
import com.roadready.model.Customer;
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
    public TokenDto signup(@RequestBody SignupRequestDto dto) {
        Customer customer = userService.createCustomer(dto, passwordEncoder.encode(dto.password()));
        String token = jwtUtility.generateToken(customer.getUser().getUsername());
        return new TokenDto(customer.getUser().getUsername(), "CUSTOMER", token);
    }

    @GetMapping("/login")
    public TokenDto login(Principal principal) {
        User user = (User)userService.loadUserByUsername(principal.getName());
        String token = jwtUtility.generateToken(principal.getName());
        String role = user.getRole().toString();

        return new TokenDto(
                principal.getName(),
                role,
                token
        );
    }
}