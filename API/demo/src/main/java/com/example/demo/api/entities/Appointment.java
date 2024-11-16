package com.example.demo.api.entities;

import com.example.demo.api.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import lombok.NonNull;

@Entity
@Table(name = "Appointment")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentId")
    long id;

    @NonNull
    @Column(nullable = false) // Database-level non-null constraint
    String fullname;

    @NonNull
    @Column(nullable = false)
    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid")
    String phoneNumber;

    @NonNull
    @Column(nullable = false)
    float total;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    User user;

    @JsonIgnore
    @Column(name = "bookedAccount")
    String bookedAccount;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "serviecesId", nullable = false)
    Services services;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "branchId", nullable = false)
    Branch branch;

    @NonNull
    @Column(name = "appointmentDate", nullable = false)
    String appointmentDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "slotId")
    Slot slot;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointmentStatus", length = 20, nullable = false)
    AppointmentStatus appointmentStatus;

    @JsonIgnore
    @OneToOne(mappedBy = "appointment")
    Payment payment;

    boolean isDeleted = false;
}

