package com.example.demo.api.service;

import com.example.demo.api.dtos.request.ServicesRequest.ServiceRequest;
import com.example.demo.api.entities.Services;
import com.example.demo.api.exception.DuplicateEntity;
import com.example.demo.api.repository.ServicesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {

    @Autowired
    ServicesRepository servicesRepository;

    @Autowired
    ModelMapper modelMapper;


    public Services createService(ServiceRequest serviceRequest) {
        try {
            Services services = modelMapper.map(serviceRequest, Services.class);

            Services newService = servicesRepository.save(services);
            return newService;
        }catch (Exception e){
            throw new DuplicateEntity("Duplicate service");
        }
    }

    public List<Services> getAllServices() {
        return servicesRepository.findAllActive();
    }

    public Services update(long id, Services services) {
        Services oldServices = getServiceById(id);

        oldServices.setServiceName(services.getServiceName());
        oldServices.setServicePrice(services.getServicePrice());

        return servicesRepository.save(oldServices);
    }

    public Services delete(long id) {
        Services oldServices = getServiceById(id);
        oldServices.setDeleted(true);
        return servicesRepository.save(oldServices);

    }


    public Services getServiceById(long id) {
        Services oldServices = servicesRepository.findServicesById(id);
        if(oldServices == null) throw new EntityNotFoundException("Service not found");
        return oldServices;
    }
}
