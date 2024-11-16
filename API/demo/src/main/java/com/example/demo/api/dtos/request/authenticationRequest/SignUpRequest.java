package com.example.demo.api.dtos.request.authenticationRequest;

import com.example.demo.api.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpRequest {
    @NotBlank(message = "USER NAME NOT NULL")
    String username;

    @NotBlank(message = "EMAIL IS NOT NULL")
    String email;

    @NotBlank(message = "PASSWORD NOT NULL")
    String password;

    String phoneNumber;

    String dateOfBirth;

    Role  role ;

}
