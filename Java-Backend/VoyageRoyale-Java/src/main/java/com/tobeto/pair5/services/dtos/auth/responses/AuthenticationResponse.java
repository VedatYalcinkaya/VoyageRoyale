package com.tobeto.pair5.services.dtos.auth.responses;

import com.tobeto.pair5.entities.concretes.User;
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
public class AuthenticationResponse {
    private String token;
    private String refreshToken;
    private List<Role> roles;
    private User user;
}
