package com.roadready.service;

import com.roadready.model.User;
import com.roadready.repository.AdminRepository;
import com.roadready.repository.CustomerRepository;
import com.roadready.repository.RentalAgentRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;
    private final RentalAgentRepository rentalAgentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find the user across the three repositories
        User user = findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Maps User interface to Spring Security's UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }

    /*
     * method to search all user tables for a matching email.
     * Returns an Optional containing the User interface.
     */
    public Optional<User> findUserByEmail(String email) {
        // Check Customers first (usually the largest table/most frequent logins)
        Optional<? extends User> user = customerRepository.findByEmail(email);
        if (user.isPresent()) return (Optional<User>) user;

        // Check Admins
        user = adminRepository.findByEmail(email);
        if (user.isPresent()) return (Optional<User>) user;

        // Check Rental Agents
        user = rentalAgentRepository.findByEmail(email);
        if (user.isPresent()) return (Optional<User>) user;

        return Optional.empty();
    }

//    public User save(){
//        return UserRepository
//    }
}