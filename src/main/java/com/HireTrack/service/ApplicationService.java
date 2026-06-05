package com.HireTrack.service;

import com.HireTrack.dto.ApplicationResponseDto;
import com.HireTrack.exception.ResourceNotFoundException;
import com.HireTrack.model.Application;
import com.HireTrack.model.Job;
import com.HireTrack.model.JobSeeker;
import com.HireTrack.model.User;
import com.HireTrack.repository.ApplicationRepository;
import com.HireTrack.repository.JobRepository;
import com.HireTrack.repository.JobSeekerRepository;
import com.HireTrack.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@AllArgsConstructor
public class ApplicationService {

        private final UserRepository userRepository;
        private final JobSeekerRepository jobSeekerRepository;
        private final JobRepository jobRepository;
        private final ApplicationRepository applicationRepository;

        public ApplicationResponseDto applyForJob(int jobId, String username) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                JobSeeker jobSeeker = jobSeekerRepository.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("JobSeeker profile not found"));

                Job job = jobRepository.findById(jobId)
                                .orElseThrow(() -> new RuntimeException("Job not found"));

                Application application = new Application();
                application.setJobSeeker(jobSeeker);
                application.setJob(job);

                Application savedApplication = applicationRepository.save(application);

                return new ApplicationResponseDto(
                                savedApplication.getId(),
                                savedApplication.getAppliedAt(),
                                job.getTitle(),
                                job.getEmployer().getCompanyName());
        }

        public Page<ApplicationResponseDto> getMyApplications(String username, int page, int size) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                JobSeeker jobSeeker = jobSeekerRepository.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("JobSeeker profile not found"));

                Pageable pageable = PageRequest.of(page, size);
                Page<Application> applications = applicationRepository.findByJobSeekerId(jobSeeker.getId(), pageable);

                return applications.map(app -> new ApplicationResponseDto(
                                app.getId(),
                                app.getAppliedAt(),
                                app.getJob().getTitle(),
                                app.getJob().getEmployer().getCompanyName()));
        }
}
