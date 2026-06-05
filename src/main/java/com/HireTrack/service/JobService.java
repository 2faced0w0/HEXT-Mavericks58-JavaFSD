package com.HireTrack.service;

import com.HireTrack.dto.CreateJobRequestDto;
import com.HireTrack.dto.JobResponseDto;
import com.HireTrack.model.Employer;
import com.HireTrack.model.Job;
import com.HireTrack.model.User;
import com.HireTrack.repository.EmployerRepository;
import com.HireTrack.repository.JobRepository;
import com.HireTrack.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerRepository employerRepository;
    private final UserRepository userRepository;

    public void addJob(CreateJobRequestDto dto, Principal principal){
        String username= principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Employer employer = employerRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        Job job = new Job();
        job.setDescription(dto.description());
        job.setTitle(dto.title());
        job.setSalary(dto.salary());
        job.setLocation(dto.location());
        job.setEmployer(employer);

        jobRepository.save(job);
    }

    public Page<JobResponseDto> getAllJobs(int page, int size, Principal principal){
        Pageable pageable = PageRequest.of(page, size);
        Page<Job> jobs=jobRepository.findAll(pageable);

        return jobs.map(job->new JobResponseDto(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getEmployer().getCompanyName(),
                job.getLocation(),
                job.getSalary()
        ));
    }
}
