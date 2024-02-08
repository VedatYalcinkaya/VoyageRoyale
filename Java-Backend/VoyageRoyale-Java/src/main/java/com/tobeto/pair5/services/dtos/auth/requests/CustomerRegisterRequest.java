package com.tobeto.pair5.services.dtos.auth.requests;

import com.tobeto.pair5.entities.concretes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String tcNo;
    private LocalDate birthDate;
    private List<Role> authorities;
}
