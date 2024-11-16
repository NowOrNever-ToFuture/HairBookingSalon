package com.example.demo.api.dtos.request.ServicesRequest;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRequest {
    String serviceName;
    Float servicePrice;
    String serviceDetail;
    String imgSrc;

}
