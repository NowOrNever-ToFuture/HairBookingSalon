package com.example.demo.api.dtos;

import com.example.demo.api.entities.User;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailDetail {
    User receiver;
    String subject;
    String link;

}
