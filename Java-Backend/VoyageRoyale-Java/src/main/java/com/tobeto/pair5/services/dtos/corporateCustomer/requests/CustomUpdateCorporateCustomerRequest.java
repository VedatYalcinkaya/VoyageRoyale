package com.tobeto.pair5.services.dtos.corporateCustomer.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUpdateCorporateCustomerRequest {
    @NotNull(message = "Id must not be null")
    @Positive(message = "Id field must be positive")
    private  int id;

    @NotNull(message = "Company name must not be null")
    private String companyName;

    @NotNull(message = "Tax number must not be null")
    @Size(min = 11,message = "Tax name must be at least 11 characters")
    private String taxNo;

    @Email(message = "userEmail must be in e-mail format")
    private String userEmail;

    private String userImagePath;
}
