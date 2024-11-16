package com.example.demo.api.dtos.request.PaymentRequest;


import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.enums.PaymentSatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {
    long userId;
    String paymentMethod;
    long appointmentId;
    LocalDate paymentDate;
    PaymentSatus status;

}
