package com.tobeto.pair5.services.dtos.user.responses;

import com.tobeto.pair5.entities.concretes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdUserResponse {
    private int id;
    private String email;
    private String password;
    private List<Role> authorities;
    private String userImagePath;

}
