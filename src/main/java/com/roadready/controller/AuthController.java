package com.roadready.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.roadready.dto.SignupRequestDto;
import com.roadready.dto.TokenDto;
import com.roadready.exception.CustomerNotFoundException;
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

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtUtility jwtUtility;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;
    private final RentalAgentRepository rentalAgentRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signup")
    public TokenDto signup(@RequestBody SignupRequestDto dto) {
        Customer customer = userService.createCustomer(dto, passwordEncoder.encode(dto.password()));
        String token = jwtUtility.generateToken(customer.getUser().getUsername());
        return new TokenDto(customer.getName(), customer.getUser().getUsername(), "CUSTOMER", token, customer.getId());
    }

    @GetMapping("/login")
    public TokenDto login(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        String token = jwtUtility.generateToken(principal.getName());
        String role = user.getRole().toString();

        Integer id = null;
        if (role.equals("CUSTOMER")) {
            id = customerRepository.findByUser(user).map(Customer::getId).orElseThrow(
                    () -> new CustomerNotFoundException("Invalid Credentials!!!"));
        } else if (role.equals("ADMIN")) {
            id = adminRepository.findByUser(user).map(com.roadready.model.Admin::getId).orElseThrow(
                    () -> new CustomerNotFoundException("Invalid Credentials!!!"));
        } else if (role.equals("RENTAL_AGENT")) {
            id = rentalAgentRepository.findByUser(user).map(com.roadready.model.RentalAgent::getId).orElseThrow(
                    () -> new CustomerNotFoundException("Invalid Credentials!!!"));
        }

        return new TokenDto(
                customerRepository.findByUser(user).map(Customer::getName).orElse(null),
                principal.getName(),
                role,
                token,
                id);
    }
}