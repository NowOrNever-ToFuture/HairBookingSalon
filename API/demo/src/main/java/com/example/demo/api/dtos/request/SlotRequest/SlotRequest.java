package com.example.demo.api.dtos.request.SlotRequest;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SlotRequest {
    String SlotTime;
}
