package com.example.demo.api.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDateTime;

@Entity
@Table(name = "verification_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerificationToken {
    @Id
    @Column(name = "otp")
    int otp;

    @Column(name = "email", length = 255)
    String email;

    @Column(name = "expiry_time")
    LocalDateTime expiryTime;

    @Column(name = "fullname", length = 255)
    String fullname;

    @Column(name = "password", length = 255)
    String password;
}
