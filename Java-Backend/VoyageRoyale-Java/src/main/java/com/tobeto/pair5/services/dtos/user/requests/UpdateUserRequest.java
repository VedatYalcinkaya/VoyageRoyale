package com.tobeto.pair5.services.dtos.user.requests;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    @Positive(message = "Please enter a valid Id.")
    private int id;
    private String email;
    private String password;
}
