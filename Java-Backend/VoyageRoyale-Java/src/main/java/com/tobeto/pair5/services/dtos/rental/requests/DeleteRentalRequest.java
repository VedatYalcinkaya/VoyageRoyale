package com.tobeto.pair5.services.dtos.rental.requests;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteRentalRequest {
    @Positive(message = "Please enter a valid Id.")
    private int id;
}
