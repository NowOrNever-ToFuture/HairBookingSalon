package com.example.demo.api.service;

import com.example.demo.api.dtos.request.PaymentRequest.PaymentRequest;
import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.dtos.response.PaymentResponse.PaymentResponse;
import com.example.demo.api.entities.*;
import com.example.demo.api.mapper.PaymentMapper;
import com.example.demo.api.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AppointmentRepository appointmentRepository;


    @Autowired
    BranchRepository branchRepository;
    @Autowired
    PaymentMapper paymentMapper;

    @Autowired
    ServicesRepository servicesRepository;

    @Transactional
    public PaymentResponse create(PaymentRequest paymentRequest) {
        // Fetch appointment based on appointmentId from PaymentRequest
        Appointment appointment = appointmentRepository.findById(paymentRequest.getAppointmentId())
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with ID: " + paymentRequest.getAppointmentId()));

        // Get the user from the appointment
        Payment payment = paymentMapper.toEntity(paymentRequest, appointment);

        // Set additional fields for Payment entity
        payment.setPaymentSatus(paymentRequest.getStatus());
        payment.setPaymentDate(paymentRequest.getPaymentDate());

        // Save payment entity
        Payment savedPayment = paymentRepository.save(payment);

        // Map to PaymentResponse and return
        return paymentMapper.toResponse(savedPayment);
    }



    public List<Payment> getAllPayment() {
        List<Payment> payments = paymentRepository.findAll();
        return payments;
    }

    public Payment update(long id, Payment payment) {
        Payment oldPayment = getPaymentById(id);

        oldPayment.setAppointment(payment.getAppointment());
        oldPayment.setPaymentMethod(payment.getPaymentMethod());
        oldPayment.setPaymentDate(payment.getPaymentDate());
        oldPayment.setTotal(payment.getTotal());

        return paymentRepository.save(oldPayment);
    }

    public Payment delete(long id) {
        Payment oldPayment = getPaymentById(id);
        oldPayment.setDeleted(true);
        return paymentRepository.save(oldPayment);
    }

    public Payment getPaymentById(long id) {
        Payment oldPayment = paymentRepository.findPaymentById(id);
        if (oldPayment == null) throw new EntityNotFoundException("Payment not found");
        return oldPayment;
    }

}
