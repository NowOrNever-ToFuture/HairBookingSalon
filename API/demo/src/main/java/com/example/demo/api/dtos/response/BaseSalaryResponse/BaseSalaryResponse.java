package com.example.demo.api.dtos.response.BaseSalaryResponse;


import com.example.demo.api.enums.Role;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseSalaryResponse {
    long id;
    Float baseSalaryAmount;
    Role role;
}
