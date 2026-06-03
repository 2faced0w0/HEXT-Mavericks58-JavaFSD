package com.cms.config;

import com.cms.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private final JwtFilter jwtFilter;

//    @Bean
//    public UserDetailsService users() {
//        UserDetails user1 = User.builder()
//                .username("john_doe")
//                .password("{noop}password123")
//                .roles("OFFICER")
//                .build();
//        UserDetails user2 = User.builder()
//                .username("robert_davids")
//                .password("{noop}pass123")
//                .roles("STATION_HEAD")
//                .build();
//        return new InMemoryUserDetailsManager(user1, user2);
//    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) /// Spring needs this for POST,PUT & DELETE
                //.csrf(ref->ref.disable())
                .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/officer/add").permitAll()

                                .requestMatchers(HttpMethod.GET, "/api/station/by-incident/{incidentId}").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/incident/suspect/by-incident/{incidentId}").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/incident/all/v2").hasAuthority("OFFICER")
                                .requestMatchers(HttpMethod.GET, "/api/incident/get-one/{id}").hasAnyAuthority("OFFICER", "STATION_HEAD")
                                .requestMatchers(HttpMethod.POST, "/api/incident/add/v2/{officerId}").hasAuthority("OFFICER")
                                .requestMatchers(HttpMethod.GET, "/api/incident/get/officer/{officerId}").hasAuthority("STATION_HEAD")

                                .requestMatchers(HttpMethod.GET, "/api/officer/by-incident/stat").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/incident/stat/by-type").permitAll()

                                .requestMatchers(HttpMethod.POST, "/api/officer/id/upload").hasAuthority("OFFICER")
                                .anyRequest().authenticated()

                        //.anyRequest().denyAll()
                        // .anyRequest().permitAll() -- all API work without Auth
                );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults()); //i am telling Spring that i am using Basic Auth technique
        return http.build();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
        //return new BCryptPasswordEncoder();
    }
}