package com.tobeto.pair5.services.dtos.user.requests;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteUserRequest {
    @Positive(message = "Please enter a valid Id.")
    private int id;
}
