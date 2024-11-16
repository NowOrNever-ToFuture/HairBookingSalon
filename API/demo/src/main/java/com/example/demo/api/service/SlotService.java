package com.example.demo.api.service;

import com.example.demo.api.dtos.request.SlotRequest.SlotRequest;
import com.example.demo.api.entities.Slot;
import com.example.demo.api.repository.SlotRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {
    @Autowired
    SlotRepository slotRepository;

    @Autowired
    ModelMapper modelMapper;

    public Slot create(SlotRequest slotRequest) {
        Slot slot = modelMapper.map(slotRequest, Slot.class);

        Slot newSlot = slotRepository.save(slot);
        return newSlot;
    }

    public List<Slot> getAllSlot() {
        List<Slot> slots = slotRepository.findAll();
        return slots;
    }

    public Slot update(long id, SlotRequest slotRequest) {
        Slot oldSlot = getSlotById(id);

        oldSlot.setSlotTime(slotRequest.getSlotTime());

        return slotRepository.save(oldSlot);
    }

    public Slot delete(long id) {
        Slot oldSlot = getSlotById(id);
        oldSlot.setDeleted(true);
        return slotRepository.save(oldSlot);
    }

    public Slot getSlotById(long id) {
        Slot oldSlot = slotRepository.findSlotById(id);
        if(oldSlot == null) throw new EntityNotFoundException("Slot not found");
        return oldSlot;
    }
}
