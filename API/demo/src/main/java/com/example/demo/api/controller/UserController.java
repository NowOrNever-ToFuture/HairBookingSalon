package com.example.demo.api.controller;



import com.example.demo.api.dtos.request.UserRequest.UserRequest;
import com.example.demo.api.entities.User;
import com.example.demo.api.service.UserService;
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
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody UserRequest user) {
        User newUser = userService.createNewUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping
    public ResponseEntity get() {
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody User user) {
        User updatedUser = userService.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        User deletedUser = userService.delete(id);
        return ResponseEntity.ok(deletedUser);
    }


}