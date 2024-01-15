package com.tobeto.pair5.services.dtos.position.requests;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddPositionRequest {

    private double latitude;

    private double longitude;

    private String city;
}
