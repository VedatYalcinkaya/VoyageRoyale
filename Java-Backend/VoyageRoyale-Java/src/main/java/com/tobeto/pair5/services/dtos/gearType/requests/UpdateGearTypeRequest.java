package com.tobeto.pair5.services.dtos.gearType.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateGearTypeRequest {
    @Positive(message = "Id must be a positive number!")
    @NotNull(message = "Id field can not be empty!")
    private int id;

    @NotNull(message = "Name field can not be empty!")
    @Size(min=3,message = "Gear type name must be at least 3 characters")
    private String name;
}
