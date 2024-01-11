package com.tobeto.pair5.services.dtos.corporateCustomer.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class GetCorporateCustomerResponse {
    private int id;
    private String companyName;
    private String taxNo;
    private int userId;
}
