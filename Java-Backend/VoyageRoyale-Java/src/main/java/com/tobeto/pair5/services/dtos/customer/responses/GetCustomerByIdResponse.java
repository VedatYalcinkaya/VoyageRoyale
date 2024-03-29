package com.tobeto.pair5.services.dtos.customer.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCustomerByIdResponse {
    private int id;
    private int userId;
    private String firstName;
    private String lastName;
    private String userEmail;
    private String tcNo;
    private Integer birthDate;
    private String userImagePath;
}
