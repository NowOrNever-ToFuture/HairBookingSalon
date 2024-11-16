package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.util.List;

@Entity
@Table(name = "Service")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "servicesId")
    long id;

    @Column(name = "serviceName", length = 100)
    String serviceName;

    @Column(name = "servicePrice")
    Float servicePrice;

    @Column(name = "serviceDetail")
    String serviceDetail;

    @Column(name = "imgSrc")
    String imgSrc;

    boolean isDeleted = false;

    @OneToMany(mappedBy = "services")
    List<Appointment> appointments;
}
