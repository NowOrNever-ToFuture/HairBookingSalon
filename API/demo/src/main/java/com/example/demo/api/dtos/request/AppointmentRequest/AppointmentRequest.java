package com.example.demo.api.dtos.request.AppointmentRequest;

import com.example.demo.api.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentRequest {
    @NotBlank(message = "FULL NAME NOT NULL")
    String fullname;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid")
    @NotBlank(message = "PHONE NOT NULL")
    String phoneNumber;

    @NotNull(message = "SERVICE ID NOT NULL")
    Long serviceId;

    @NotBlank(message = "BRANCH NOT NULL")
    String branchName;

    @NotNull(message = "USER ID NOT NULL")
    Long userId;

    @NotNull(message = "Total price is not null")
    float total;

    @NotNull(message = "Slot ID cannot be null")
    Long slotId;

    @NotNull(message = "Status cannot be null")
    AppointmentStatus status = AppointmentStatus.PENDING;

    @NotNull(message = "DATE NOT NULL")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate appointmentDate; // Changed to LocalDate
}