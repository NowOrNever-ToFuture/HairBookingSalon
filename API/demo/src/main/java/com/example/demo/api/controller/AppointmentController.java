package com.example.demo.api.controller;
import com.example.demo.api.dtos.request.AppointmentRequest.AppointmentRequest;
import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody AppointmentRequest appointment) throws Exception {
        String VnpayUrl = appointmentService.createUrl(appointment);
        return ResponseEntity.ok(VnpayUrl);
    }

    @GetMapping
    public ResponseEntity get() {
        List<AppointmentResponse> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }



}
