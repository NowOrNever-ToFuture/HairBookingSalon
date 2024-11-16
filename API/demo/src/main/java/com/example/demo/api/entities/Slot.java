package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import java.util.List;

@Entity
@Table(name = "Slot")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slotId")
    long id;

    @Column
    String slotTime;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "branchId")
    Branch branch;

    boolean isDeleted = false;

    @OneToMany(mappedBy = "slot")  // Ensure "slot" is the correct field in Appointment entity
    List<Appointment> appointments;
}

