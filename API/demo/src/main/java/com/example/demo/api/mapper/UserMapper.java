package com.example.demo.api.mapper;

import com.example.demo.api.dtos.request.authenticationRequest.SignInRequest;
import com.example.demo.api.dtos.request.authenticationRequest.SignUpRequest;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignInResponse;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignUpResponse;
import com.example.demo.api.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(SignUpRequest signUpRequest);
    User toUser(SignInRequest signInRequest);
    SignUpResponse toSignUpResponse(User user);
    SignInResponse toSignInResponse(User user, String token);
}
