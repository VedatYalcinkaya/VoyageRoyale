package com.tobeto.pair5.services.dtos.brand.requests;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteBrandRequest {
    @Positive(message = "Id must be a positive number")
    private int id;

}
