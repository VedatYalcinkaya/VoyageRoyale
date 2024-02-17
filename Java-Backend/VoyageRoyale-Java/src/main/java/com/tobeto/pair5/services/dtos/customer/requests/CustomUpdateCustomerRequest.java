package com.tobeto.pair5.services.dtos.customer.requests;

import jakarta.validation.constraints.Email;
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
public class CustomUpdateCustomerRequest {
    @Positive(message = "Id must be a positive number!")
    @NotNull(message = "Id cannot be empty!")
    private int id;
    @NotNull(message = "firstName field cannot be empty!")
    private String firstName;
    @NotNull(message = "lastName field cannot be empty!")
    private String lastName;
    @Email(message = "userEmail must be in e-mail format")
    private String userEmail;
    @Size(min = 11, max = 11, message = "Tc No must be 11 characters;")
    private String tcNo;

    private Integer birthDate;
    private String userImagePath;
}
