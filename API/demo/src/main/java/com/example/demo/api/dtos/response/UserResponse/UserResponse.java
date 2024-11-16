package com.example.demo.api.dtos.response.UserResponse;

import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class UserResponse {
    long id;
    String username;
    String role;
    String email;
    String phoneNumber;
    String staffSpecialty;
    String BranchName;
    boolean google_account;

}
