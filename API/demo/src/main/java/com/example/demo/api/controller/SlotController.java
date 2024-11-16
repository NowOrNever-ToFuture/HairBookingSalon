package com.example.demo.api.controller;


import com.example.demo.api.dtos.request.SlotRequest.SlotRequest;
import com.example.demo.api.entities.Slot;
import com.example.demo.api.service.SlotService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/slot")
public class SlotController {

    @Autowired
    SlotService slotService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody SlotRequest slotRequest) {
        Slot newSlot = slotService.create(slotRequest);
        return ResponseEntity.ok(newSlot);
    }

    @GetMapping
    public ResponseEntity get() {
        List<Slot> slots = slotService.getAllSlot();
        return ResponseEntity.ok(slots);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody SlotRequest slotRequest) {
        Slot updatedSlot = slotService.update(id, slotRequest);
        return ResponseEntity.ok(updatedSlot);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        Slot deletedSlot = slotService.delete(id);
        return ResponseEntity.ok(deletedSlot);
    }
}
