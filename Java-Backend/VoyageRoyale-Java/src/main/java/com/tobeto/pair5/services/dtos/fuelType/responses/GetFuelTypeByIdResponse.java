package com.tobeto.pair5.services.dtos.fuelType.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetFuelTypeByIdResponse {
    private int id;
    private String name;
}
