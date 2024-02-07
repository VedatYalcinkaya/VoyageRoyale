package com.tobeto.pair5.services.dtos.invoice.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddInvoiceRequest {
    private int rentalId;
    private float taxRate;
    private double totalPrice;
    private String invoiceNo;
}
