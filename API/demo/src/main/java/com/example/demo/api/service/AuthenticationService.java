package com.example.demo.api.service;

import com.example.demo.api.dtos.EmailDetail;
import com.example.demo.api.dtos.request.authenticationRequest.SignInRequest;
import com.example.demo.api.dtos.request.authenticationRequest.SignUpRequest;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignInResponse;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignUpResponse;
import com.example.demo.api.entities.User;
import com.example.demo.api.exception.DuplicateEntity;
import com.example.demo.api.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService implements UserDetailsService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenService tokenService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    EmailService emailService;


    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        User user = modelMapper.map(signUpRequest, User.class);
        try {
            String originPassword = user.getPassword();
            user.setPassword(passwordEncoder.encode(originPassword));
            User newUser = userRepository.save(user);

            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(newUser);
            emailDetail.setSubject("Welcome to Blocal family! We're excited to have you");
            emailDetail.setLink("https://www.google.com/?hl=vi");
            emailService.sendEmail(emailDetail);

            return modelMapper.map(newUser, SignUpResponse.class);
        } catch (Exception e) {
            if (e.getMessage().contains(user.getUsername())) {
                throw new DuplicateEntity("Duplicate username.");
            } else if (e.getMessage().contains(user.getEmail())) {
                throw new DuplicateEntity("Duplicate email.");
            } else if (e.getMessage().contains(user.getPhoneNumber())) {
                throw new DuplicateEntity("Duplicate phone number.");
            } else {
                throw new RuntimeException("An unexpected error occurred during sign up.");
            }
        }
    }

    public  SignInResponse signIn(SignInRequest signInRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signInRequest.getEmail(),
                    signInRequest.getPassword()
            ));
            User user = (User) authentication.getPrincipal();

            SignInResponse signInResponse = modelMapper.map(user, SignInResponse.class);
            signInResponse.setUsername(user.getUsername());
            signInResponse.setToken(tokenService.generateToken(user));

            return signInResponse;
        } catch (Exception e) {
            throw new EntityNotFoundException("Email or password is incorrect.");
        }
    }

    public User getCurrentUser(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserById(user.getId());
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email);
    }

}
