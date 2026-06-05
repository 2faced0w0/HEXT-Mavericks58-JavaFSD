package com.HireTrack.service;

import com.HireTrack.dto.SignupRequestDto;
import com.HireTrack.enums.Role;
import com.HireTrack.model.Employer;
import com.HireTrack.model.JobSeeker;
import com.HireTrack.model.User;
import com.HireTrack.repository.EmployerRepository;
import com.HireTrack.repository.JobSeekerRepository;
import com.HireTrack.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JobSeekerRepository jobSeekerRepository;
    private final EmployerRepository employerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

        return user;
    }

    public User save(User user){

        return userRepository.save(user);
    }

    public void createJobSeeker(SignupRequestDto dto){

        String username=dto.email();
        String password= dto.password();
        Role role= Role.SEEKER;

        String hashedPassword=passwordEncoder.encode(password);

        User user=new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setRole(role);

        JobSeeker jobSeeker=new JobSeeker();
        jobSeeker.setUser(user);
        jobSeeker.setName(dto.name());

        jobSeekerRepository.save(jobSeeker);
    }

    public void createEmployer(SignupRequestDto dto){

        String username=dto.email();
        String password= dto.password();
        Role role= Role.EMPLOYER;

        String hashedPassword=passwordEncoder.encode(password);

        User user=new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setRole(role);

        Employer employer=new Employer();
        employer.setUser(user);
        employer.setCompanyName(dto.name());

        employerRepository.save(employer);
    }
}
