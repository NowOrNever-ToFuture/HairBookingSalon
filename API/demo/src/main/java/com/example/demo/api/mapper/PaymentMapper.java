package com.example.demo.api.mapper;

import com.example.demo.api.dtos.request.PaymentRequest.PaymentRequest;
import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.dtos.response.PaymentResponse.PaymentResponse;
import com.example.demo.api.dtos.response.UserResponse.UserResponse;
import com.example.demo.api.entities.Appointment;
import com.example.demo.api.entities.Payment;
import com.example.demo.api.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    // Maps PaymentRequest and Appointment to Payment entity
    @Mapping(target = "appointment", source = "appointment")
    @Mapping(target = "paymentMethod", source = "paymentRequest.paymentMethod")
    @Mapping(target = "paymentDate", source = "paymentRequest.paymentDate")
    @Mapping(target = "paymentSatus", source = "paymentRequest.status")
    Payment toEntity(PaymentRequest paymentRequest, Appointment appointment);

    // Maps Payment entity to PaymentResponse DTO
    @Mapping(target = "userId", source = "appointment.user.id")
    @Mapping(target = "appointmentId", source = "appointment.id")
    PaymentResponse toResponse(Payment payment);
}