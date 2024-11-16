package com.example.demo.api.dtos.response.AuthenticationResponse;

import com.example.demo.api.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class SignInResponse {
    long id;
    String token;
    String userId;
    String username;
    String dateOfBirth;
    String phoneNumber;
    String email;
    Role role;
    boolean isDeleted;
}
