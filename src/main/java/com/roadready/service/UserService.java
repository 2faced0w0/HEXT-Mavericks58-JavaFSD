package com.roadready.service;

import com.roadready.model.Admin;
import com.roadready.model.Customer;
import com.roadready.model.RentalAgent;
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
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole())));
    }

    /*
     * method to search all user tables for a matching email.
     * Returns an Optional containing the User interface.
     */
    public Optional<User> findUserByEmail(String email) {
        // Check Customers first (usually the largest table/most frequent logins)
        Optional<? extends User> user = customerRepository.findByEmail(email);
        if (user.isPresent())
            return (Optional<User>) user;

        // Check Admins
        user = adminRepository.findByEmail(email);
        if (user.isPresent())
            return (Optional<User>) user;

        // Check Rental Agents
        user = rentalAgentRepository.findByEmail(email);
        if (user.isPresent())
            return (Optional<User>) user;

        return Optional.empty();
    }

    public Customer createCustomer(com.roadready.dto.SignupRequestDto dto, String encodedPassword) {
        if (findUserByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + dto.email());
        }
        Customer customer = new Customer();
        customer.setName(dto.name());
        customer.setEmail(dto.email());
        customer.setPasswordHash(encodedPassword);
        customer.setPhoneNumber(dto.phoneNumber());
        return customerRepository.save(customer);
    }

    public Admin createAdmin(com.roadready.dto.SignupRequestDto dto, String encodedPassword) {
        if (findUserByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + dto.email());
        }
        Admin admin = new Admin();
        admin.setName(dto.name());
        admin.setEmail(dto.email());
        admin.setPasswordHash(encodedPassword);
        admin.setPhoneNumber(dto.phoneNumber());
        return adminRepository.save(admin);
    }

    public RentalAgent createRentalAgent(com.roadready.dto.SignupRequestDto dto, String encodedPassword, Admin admin) {
        if (findUserByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + dto.email());
        }
        RentalAgent agent = new RentalAgent();
        agent.setName(dto.name());
        agent.setEmail(dto.email());
        agent.setPasswordHash(encodedPassword);
        agent.setPhoneNumber(dto.phoneNumber());
        agent.setAdmin(admin);
        return rentalAgentRepository.save(agent);
    }
}