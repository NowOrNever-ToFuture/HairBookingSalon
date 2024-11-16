package com.example.demo.api.dtos.request.UserRequest;

import com.example.demo.api.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {
    String username;
    @Email(message = "Email not valid!")
    @NotBlank(message = "Email not blank")
    String email;
    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid")
    String phoneNumber;
    String staffSpecialty;
    Role role;
    long BranchId;
    @NotBlank(message = "Password not null")
    String password;
}
