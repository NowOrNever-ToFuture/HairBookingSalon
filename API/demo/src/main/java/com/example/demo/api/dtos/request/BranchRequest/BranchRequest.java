package com.example.demo.api.dtos.request.BranchRequest;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchRequest {
    String branchName;
    String branchAddress;
    String branchPhoneNumber;
    String imageSrc;
}
