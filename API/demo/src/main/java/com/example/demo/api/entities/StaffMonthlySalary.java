package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDate;

@Entity
@Table(name = "Staff_Monthly_Salary")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffMonthlySalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staffMonthlySalaryId")
    long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @Column(name = "baseSalaryAmount")
    Float baseSalaryAmount;

    @Column(name = "bonuses")
    Float bonuses;

    @Column(name = "totalSalary")
    Float totalSalary;

    @Column(name = "year")
    int year;

    @Column(name = "month")
    int month;

    @Column(name = "calculatedDate")
    LocalDate calculatedDate;

    boolean isDeleted = false;
}
