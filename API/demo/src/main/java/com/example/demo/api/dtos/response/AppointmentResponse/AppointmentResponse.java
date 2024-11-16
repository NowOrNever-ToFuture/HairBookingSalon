package com.example.demo.api.dtos.response.AppointmentResponse;

import com.example.demo.api.dtos.response.UserResponse.UserResponse;
import com.example.demo.api.entities.User;
import com.example.demo.api.enums.AppointmentStatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentResponse {
    long id;
    String fullname;
    String phoneNumber;
    long userId;
    String serviceName;
    String branchName;
    String slotTime;
    float total;
    UserResponse user;
    AppointmentStatus appointmentStatus;
    String appointmentDate;

}
