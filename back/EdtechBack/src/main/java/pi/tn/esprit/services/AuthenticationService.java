package pi.tn.esprit.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import pi.tn.esprit.models.ERole;
import pi.tn.esprit.models.Role;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.User;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.tn.esprit.payload.request.LoginRequest;
import pi.tn.esprit.payload.request.SignupRequest;
import pi.tn.esprit.payload.request.VerificationRequest;
import pi.tn.esprit.payload.response.AuthenticationResponse;
import pi.tn.esprit.repository.*;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.security.services.UserDetailsImpl;
import pi.tn.esprit.twofa.TwoFactorAuthenticationService;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
@Component
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    RoleRepository roleRepository;
    private final TwoFactorAuthenticationService tfaService;

    public AuthenticationResponse register(SignupRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .build();

            user.setSecret(tfaService.generateNewSecret());
        Set<String> strRoles = request.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_GUEST)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "student":
                        Role newStdRole = roleRepository.findByName(ERole.ROLE_UNCONFIRMEDSTUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(newStdRole);

                        break;
                    case "guest":
                        Role guestRole = roleRepository.findByName(ERole.ROLE_GUEST)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(guestRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        if (roles.iterator().next().getName().equals(ERole.ROLE_UNCONFIRMEDSTUDENT)){
            Student student = new Student(user.getUsername(),"",0);
            studentRepository.save(student);
        }
        repository.save(user);
        var jwtToken = jwtService.generateTokenFromUsername(user.getUsername());
        return AuthenticationResponse.builder()
                .secretImageUri(tfaService.generateQrCodeImageUri(user.getSecret()))
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(LoginRequest request) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));


        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return AuthenticationResponse.builder()
                    .id(userDetails.getId())
                    .username(request.getUsername())
                    .accessToken(jwtService.generateTokenFromUsername(request.getUsername()))
                    .build();
        }


    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userName;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userName = jwtService.getUserNameFromJwtToken(refreshToken);
        if (userName != null) {
            var user = this.repository.findByUsername(userName)
                    .orElseThrow();
            if (jwtService.validateJwtToken(refreshToken)) {
                var accessToken = jwtService.generateTokenFromUsername(user.getUsername());
                var authResponse = AuthenticationResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .accessToken(accessToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public AuthenticationResponse verifyCode(
            VerificationRequest verificationRequest
    ) {
        User user = repository
                .findByUsername(verificationRequest.getUsername())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("No user found with %S", verificationRequest.getUsername()))
                );
        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {

            //throw new BadCredentialsException("Code is not correct");
        }
        var jwtToken = jwtService.generateTokenFromUsername(user.getUsername());
        return AuthenticationResponse.builder()
                .id(user.getId())
                .role(user.getRoles().iterator().next().getName().name())
                .username(user.getUsername())
                .accessToken(jwtToken)
                .build();
    }
}