package com.tobeto.pair5.services.dtos.fuelType.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFuelTypeRequest {
    private int id;
    private String hybrid;
    private String electric;
    private String gasoline;
    private String diesel;
}
