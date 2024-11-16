package com.example.demo.api.controller;

import com.example.demo.api.dtos.request.ServicesRequest.ServiceRequest;
import com.example.demo.api.entities.Services;
import com.example.demo.api.service.ServicesService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/services")
public class ServicesController {

    @Autowired
    ServicesService servicesService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody ServiceRequest services) {
        Services newServices = servicesService.createService(services);
        return ResponseEntity.ok(newServices);
    }

    @GetMapping
    public ResponseEntity get() {
        List<Services> services = servicesService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody Services services) {
        Services updatedServices = servicesService.update(id, services);
        return ResponseEntity.ok(updatedServices);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        Services deletedServices = servicesService.delete(id);
        return ResponseEntity.ok(deletedServices);
    }
}
