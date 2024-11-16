package com.example.demo.api.controller;

import com.example.demo.api.dtos.request.PaymentRequest.PaymentRequest;
import com.example.demo.api.dtos.response.PaymentResponse.PaymentResponse;
import com.example.demo.api.entities.Payment;
import com.example.demo.api.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody PaymentRequest paymentRequest) {
        PaymentResponse newPayment = paymentService.create(paymentRequest);
        return ResponseEntity.ok(newPayment);
    }

    @GetMapping
    public ResponseEntity get() {
        List<Payment> payments = paymentService.getAllPayment();
        return ResponseEntity.ok(payments);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.update(id, payment);
        return ResponseEntity.ok(updatedPayment);
    }


}
