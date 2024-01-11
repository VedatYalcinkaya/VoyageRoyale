package com.tobeto.pair5.services.dtos.model.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteModelRequest {
    @Positive(message = "Id must be a positive number")
    @NotNull(message = "Id field can not be empty")
    private int id;

}
