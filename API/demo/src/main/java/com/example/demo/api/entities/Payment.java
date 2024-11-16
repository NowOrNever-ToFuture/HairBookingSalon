package com.example.demo.api.entities;

import com.example.demo.api.enums.PaymentSatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDate;

@Entity
@Table(name = "Payment")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId")
    long id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "appointmenntId")
    Appointment appointment;

    @Column(name = "total")
    Float total;

    @Column(name = "paymentMethod", length = 20)
    String paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    PaymentSatus paymentSatus;

    @Column(name = "paymentDate")
    LocalDate paymentDate;

    boolean isDeleted = false;
}
