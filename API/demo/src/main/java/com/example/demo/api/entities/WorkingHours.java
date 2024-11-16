package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalTime;

@Entity
@Table(name = "WorkingHours")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkingHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workingHoursId")
    long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @Column(name = "DayOfWeek", length = 20)
    String dayOfWeek;

    @Column(name = "StartTime")
    LocalTime startTime;

    @Column(name = "EndTime")
    LocalTime endTime;

    boolean isDelete = false;
}
