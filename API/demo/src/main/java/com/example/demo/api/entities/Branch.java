package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.util.List;

@Entity
@Table(name = "Branch")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branchId")
    long id;

    @Column(name = "branchName", nullable = false, length = 100)
    String branchName;

    @Column(name = "branchAddress", length = 255)
    String branchAddress;

    @Column(name = "branchPhoneNumber", length = 11)
    String branchPhoneNumber;

    @Column(name = "imageSrc")
    String imageSrc;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    List<User> user;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    List<Appointment> appointments;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    List<BranchRating> branchRatings;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")  // Corrected from "slot" to "branch"
    List<Slot> slots;

    boolean isDeleted = false;
}

