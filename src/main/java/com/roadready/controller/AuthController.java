package com.roadready.controller;

import com.roadready.dto.SignupRequestDto;
import com.roadready.dto.TokenDto;
import com.roadready.model.Customer;
import com.roadready.model.User;
import com.roadready.service.UserService;
import com.roadready.utility.JwtUtility;
import com.roadready.repository.CustomerRepository;
import com.roadready.repository.AdminRepository;
import com.roadready.repository.RentalAgentRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtility jwtUtility;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;
    private final RentalAgentRepository rentalAgentRepository;

    @PostMapping("/signup")
    public TokenDto signup(@RequestBody SignupRequestDto dto) {
        Customer customer = userService.createCustomer(dto, passwordEncoder.encode(dto.password()));
        String token = jwtUtility.generateToken(customer.getUser().getUsername());
        return new TokenDto(customer.getUser().getUsername(), "CUSTOMER", token, customer.getId());
    }

    @GetMapping("/login")
    public TokenDto login(Principal principal) {
        User user = (User)userService.loadUserByUsername(principal.getName());
        String token = jwtUtility.generateToken(principal.getName());
        String role = user.getRole().toString();
        
        Integer id = null;
        if (role.equals("CUSTOMER")) {
            id = customerRepository.findByUser(user).map(Customer::getId).orElse(null);
        } else if (role.equals("ADMIN")) {
            id = adminRepository.findByUser(user).map(com.roadready.model.Admin::getId).orElse(null);
        } else if (role.equals("RENTAL_AGENT")) {
            id = rentalAgentRepository.findByUser(user).map(com.roadready.model.RentalAgent::getId).orElse(null);
        }

        return new TokenDto(
                principal.getName(),
                role,
                token,
                id
        );
    }
}