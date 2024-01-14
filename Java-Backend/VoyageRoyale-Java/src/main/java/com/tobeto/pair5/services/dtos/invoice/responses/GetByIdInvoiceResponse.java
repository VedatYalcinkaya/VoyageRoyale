package com.tobeto.pair5.services.dtos.invoice.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class GetByIdInvoiceResponse {
    private int id;
    private Float totalPrice;
    private Float discountRate;
    private Float taxRate;
    private int rentalId;

}
