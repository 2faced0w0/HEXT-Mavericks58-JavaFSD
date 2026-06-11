package com.cms.controller;

import com.cms.dto.LoginResponseDto;
import com.cms.dto.TokenDto;
import com.cms.model.User;
import com.cms.service.UserService;
import com.cms.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtUtility jwtUtility;
    /*
    .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()

    This ensures that , if user request comes to this login() method at line
    19.. then Spring already has checked username/password and they are right
    and i can ask for username from spring
    * */
    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }

    // this is for later
    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(Principal principal){
        User user = (User)userService.loadUserByUsername(principal.getName());
        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().toString()
        );
    }
}