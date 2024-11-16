package com.example.demo.api.repository;

import com.example.demo.api.entities.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
    Slot findSlotById(long id);
    Slot findSlotBySlotTime(String slotTime);
}
