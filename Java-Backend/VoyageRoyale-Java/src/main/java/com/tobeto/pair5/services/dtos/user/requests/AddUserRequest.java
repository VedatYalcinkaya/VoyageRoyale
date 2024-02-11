package com.tobeto.pair5.services.dtos.user.requests;

import com.tobeto.pair5.entities.concretes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddUserRequest {
    private String email;
    private String password;
    private List<Role> authorities;
}
