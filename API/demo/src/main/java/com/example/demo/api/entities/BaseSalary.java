package com.example.demo.api.entities;

import com.example.demo.api.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@Entity
@Table(name = "Base_Salary")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE) // Set fields to private access level
public class BaseSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "baseSalaryId")
    long id;

    @Column(name = "baseSalaryAmount")
    Float baseSalaryAmount;

    boolean isDeleted = false;

    @Enumerated(EnumType.STRING)
    Role role;
}
