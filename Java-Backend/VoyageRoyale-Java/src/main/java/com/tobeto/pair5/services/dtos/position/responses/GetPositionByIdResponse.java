package com.tobeto.pair5.services.dtos.position.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetPositionByIdResponse {
    private  int id;
    private double latitude;

    private double longitude;

    private String city;
}
