package com.HireTrack.controller;

import com.HireTrack.dto.*;
import com.HireTrack.model.User;
import com.HireTrack.service.*;
import com.HireTrack.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AppController {

    private final UserService userService;
    private final JobService jobservice;
    private final ApplicationService applicationService;
    private final JwtUtility jwtUtility;
    private final BookService bookService;
    private final ProductService productService;

    @PostMapping("/auth/register")
    public ResponseEntity<String> signup(@RequestBody SignupRequestDto dto) {
        String role = dto.Role();
        if (role.equalsIgnoreCase("SEEKER"))
            userService.createJobSeeker(dto);
        else if (role.equalsIgnoreCase("EMPLOYER"))
            userService.createEmployer(dto);
        else
            return ResponseEntity.badRequest().body("Invalid role selected");

        return ResponseEntity.ok("Sign up successful!");
    }

    @PostMapping("/auth/login")
    public TokenDto login(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        String token = jwtUtility.generateToken(principal.getName());
        String role = user.getRole().toString();

        return new TokenDto(
                principal.getName(),
                role,
                token);
    }

    @GetMapping("/jobs")
    public ResponseEntity<Page<JobResponseDto>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            Principal principal) {
        Page<JobResponseDto> response = jobservice.getAllJobs(page, size, principal);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/jobs")
    public ResponseEntity<String> postJob(@RequestBody CreateJobRequestDto dto, Principal principal) {

        jobservice.addJob(dto, principal);
        return ResponseEntity.ok("Job posted successfully");
    }

    @PostMapping("/applications")
    public ResponseEntity<ApplicationResponseDto> apply(@RequestParam int jobId, Principal principal) {
        ApplicationResponseDto response = applicationService.applyForJob(jobId, principal.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-applications")
    public ResponseEntity<Page<ApplicationResponseDto>> getMyApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            Principal principal) {
        Page<ApplicationResponseDto> response = applicationService.getMyApplications(principal.getName(), page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/book-by-authorname")
    public List<BookResponseDto> getBooksByAuthorName(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            Principal principal
    ) {
        return bookService.getBooksByAuthorName(page, size, principal.getName());
    }

    /*
    Create a GET API to fetch the products based on Category name(Take it as request param)
- Create a Response DTO(ProductResponseDto) having
(productId,
 productName,
 categoryName,
 productPrice)

The response of the API should be List<ProductResponseDto>
Add pagination to the API
     */

    @GetMapping("/products-by-category")
    public List<ProductResponseDto> getProductsByCategory(
            @RequestParam String category,
            @RequestParam int page,
            @RequestParam int size
    ){
        return productService.getProductsByCategory(page, size, category);
    }
}
