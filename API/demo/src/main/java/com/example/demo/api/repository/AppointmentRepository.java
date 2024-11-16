package com.example.demo.api.repository;

import com.example.demo.api.entities.Appointment;
import com.example.demo.api.entities.Branch;
import com.example.demo.api.entities.Slot;
import com.example.demo.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findAppointmentById(Long appointmentId);
    Appointment findAppointmentByFullname(String fullname);
    List<Appointment> findAppointmentsByPhoneNumber(String phoneNumber);

    // Use Slot instead of String for the slot parameter
    boolean existsByUserAndSlotAndAppointmentDate(User user, Slot slot, String appointmentDate);
}

