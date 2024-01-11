package com.tobeto.pair5.services.dtos.invoice.requests;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteInvoiceRequest {
    @Positive(message = "Please enter a valid Id.")
    private int id;
}
