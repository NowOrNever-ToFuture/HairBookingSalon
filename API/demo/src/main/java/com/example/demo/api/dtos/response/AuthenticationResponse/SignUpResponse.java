package com.example.demo.api.dtos.response.AuthenticationResponse;

import com.example.demo.api.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpResponse {
    String userId;
    String username;
    String phoneNumber;
    String dateOfBirth;
    String email;
    Role role;

}
