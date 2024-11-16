package com.example.demo.api.dtos.request.BaseSalaryRequest;

import com.example.demo.api.enums.Role;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseSalaryRequest {
    Float baseSalaryAmount;
    Role role;
}
