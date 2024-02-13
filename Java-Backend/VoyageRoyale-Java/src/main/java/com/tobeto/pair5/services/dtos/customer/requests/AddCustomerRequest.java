package com.tobeto.pair5.services.dtos.customer.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCustomerRequest {
    @NotNull(message = "FirstName field cannot be empty!")
    private String firstName;
    @NotNull(message = "LastName field cannot be empty!")
    private String lastName;
    @Positive(message = "User ID must be a positive number!")
    private int userId;
    @Size(min = 11, max = 11, message = "Identity Number must be 11 characters;")
    private String tcNo;

    private LocalDate birthDate;
}
