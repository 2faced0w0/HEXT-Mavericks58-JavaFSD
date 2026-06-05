package com.cms.service;

import com.cms.dto.IncidentOfficerStatJpqlDto;
import com.cms.dto.OfficerIncidentStatRespDto;
import com.cms.dto.OfficerReqDto;
import com.cms.dto.OfficerResponseDto;
import com.cms.enums.Role;
import com.cms.exception.FileNotFoundException;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.OfficerMapper;
import com.cms.model.Officer;
import com.cms.model.User;
import com.cms.repository.OfficerRepository;
import com.cms.utility.FileUtility;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@AllArgsConstructor
public class OfficerService {

    private final OfficerRepository officerRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private static final String UPLOAD_LOC = "C:/Users/HP/Documents/java-fsd-hex-may-2026/uploads";

    public Officer getById(int officerId) {
        return officerRepository.findById(officerId)
                .orElseThrow(()-> new ResourceNotFoundException("Invalid Officer ID"));
    }

    public Officer getByUsername(String officerUsername) {
        return officerRepository.findByUserUsername(officerUsername);
    }

    public List<OfficerResponseDto> getOfficersByStationHead(String stationHeadUsername) {
        List<Officer> list = officerRepository.getOfficersByStationHead(stationHeadUsername);
        return list
                .stream()
                .map(OfficerMapper::entityToDto)
                .toList();
    }

    public Officer getByIncidentId(int incidentId) {
        return officerRepository.getByIncidentId(incidentId);
    }

    public void postOfficer(OfficerReqDto officerReqDto) {

        // Step 1: Extract user info:  username.password from dto
        String username = officerReqDto.username();
        String password = officerReqDto.password();
        Role role = Role.OFFICER;

        // Step 2: Encode the password and assign Role
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);

        // Step 3: Save the user in DB
        user = userService.save(user);

        // Step 4: Prepare Officer object and attach user to it
        Officer officer= new Officer();
        officer.setName(officerReqDto.name());
        officer.setUser(user); // officer having user

        // Step 5: Save officer having user, in DB
        officerRepository.save(officer);

    }

    public OfficerIncidentStatRespDto incidentByOfficerStat() {
        List<IncidentOfficerStatJpqlDto> list =  officerRepository.incidentByOfficerStat();

        //  Convert List<IncidentOfficerStatJpqlDto> to OfficerIncidentStatRespDto

        List<String> names =  list.stream()
                .map(IncidentOfficerStatJpqlDto::name)
                .toList();

        List<Long> numberList =  list.stream()
                .map(IncidentOfficerStatJpqlDto :: numberOfIncidents)
                .toList();

        return new OfficerIncidentStatRespDto(
                "Incidents per Officer Stat",
                names,
                numberList
        );
    }

    public void upload(String username, MultipartFile file) throws IOException {

        // Fetch Officer by given username
        Officer officer = getByUsername(username);
        // this officer coming from DB does not have the ID path attached to it

        FileUtility.validateFile(file);

        // Original filename
        String fileName = file.getOriginalFilename();

        // i am creating the path where i will upload the file: destination
        Path uploadPath =  Paths.get(UPLOAD_LOC);
        // Attach the file name to the upload path
        Path destinationPath =  uploadPath.resolve(fileName);

        // Copy the original file (Multipart) on to destination upload path
        Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

        // Save the file name in db
        officer.setIdPath(fileName);

        officerRepository.save(officer);
    }
}