package com.example.demo.api.dtos.response.PaymentResponse;

import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.enums.PaymentSatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    long paymentId;
    long userId;
    long appointmentId;
    String paymentMethod;
    LocalDate paymentDate;
    PaymentSatus status;
}
