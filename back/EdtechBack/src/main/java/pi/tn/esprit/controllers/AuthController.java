package pi.tn.esprit.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pi.tn.esprit.models.ERole;
import pi.tn.esprit.models.Role;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.User;
import pi.tn.esprit.payload.request.LoginRequest;
import pi.tn.esprit.payload.request.SignupRequest;
import pi.tn.esprit.payload.request.VerificationRequest;
import pi.tn.esprit.payload.response.AuthenticationResponse;
import pi.tn.esprit.payload.response.JwtResponse;
import pi.tn.esprit.payload.response.MessageResponse;
import pi.tn.esprit.payload.response.UserInfoResponse;
import pi.tn.esprit.repository.RoleRepository;
import pi.tn.esprit.repository.StudentRepository;
import pi.tn.esprit.repository.UserRepository;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.security.services.UserDetailsImpl;
import pi.tn.esprit.services.AuthenticationService;
import pi.tn.esprit.twofa.TwoFactorAuthenticationService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;
  @Autowired
  StudentRepository studentRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  TwoFactorAuthenticationService twoFactorAuthenticationService;
  @Autowired
  AuthenticationService service;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    var response = service.authenticate(loginRequest);
    return ResponseEntity.ok(response);

  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }
    System.out.println("//////////ddd");

    if (null != service){
      var response = service.register(signUpRequest);
      System.out.println("//////////ee");
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.accepted().build();

  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(new MessageResponse("You've been signed out!"));
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verifyCode(
          @RequestBody VerificationRequest verificationRequest
  ) {
    return ResponseEntity.ok(service.verifyCode(verificationRequest));
  }
}