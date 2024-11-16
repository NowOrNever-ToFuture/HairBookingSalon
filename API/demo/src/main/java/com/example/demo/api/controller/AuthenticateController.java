package com.example.demo.api.controller;

import com.example.demo.api.dtos.request.authenticationRequest.SignInRequest;
import com.example.demo.api.dtos.request.authenticationRequest.SignUpRequest;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignInResponse;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignUpResponse;
import com.example.demo.api.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/auth")
public class AuthenticateController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("sign-up")
    public ResponseEntity<SignUpResponse> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        SignUpResponse signUpResponse = authenticationService.signUp(signUpRequest);
        return ResponseEntity.ok(signUpResponse);
    }

    @PostMapping("sign-in")
    public ResponseEntity<SignInResponse> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        SignInResponse signInResponse = authenticationService.signIn(signInRequest);
        return ResponseEntity.ok(signInResponse);
    }



}
