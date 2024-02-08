package com.tobeto.pair5.services.dtos.auth.requests;

import com.tobeto.pair5.entities.concretes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CorporateRegisterRequest {
    private String email;
    private String password;
    private String companyName;
    private String taxNo;
    private List<Role> authorities;
}
