package com.tobeto.pair5.services.dtos.car.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeleteCarRequest {
    @Positive(message = "Id must be a positive number!")
    @NotNull(message = "Id can not be empty!")
    private int id;
}
