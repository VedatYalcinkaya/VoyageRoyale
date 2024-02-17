package com.tobeto.pair5.services.dtos.customer.responses;

import com.tobeto.pair5.services.dtos.user.responses.GetAllUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCustomerResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String userEmail;
    private String userPassword;
    private String tcNo;
    private Integer birthDate;
    private String userImagePath;
}
