package com.tobeto.pair5.services.dtos.gearType.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllGearTypeResponse {
    private int id;
    private String name;
}
