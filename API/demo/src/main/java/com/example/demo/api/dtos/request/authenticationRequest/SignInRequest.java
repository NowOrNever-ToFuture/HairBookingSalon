package com.example.demo.api.dtos.request.authenticationRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignInRequest {
    @NotBlank(message = "USER NAME NOT NULL")
    String email;

    @Size(min = 5, message = "Password must be at least 5 characters")
    @NotBlank(message = "PASSWORD NOT NULL")
    String password;
}
