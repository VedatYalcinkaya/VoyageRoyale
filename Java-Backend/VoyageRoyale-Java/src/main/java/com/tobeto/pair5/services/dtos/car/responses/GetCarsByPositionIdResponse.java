package com.tobeto.pair5.services.dtos.car.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCarsByPositionIdResponse {
    private int id;
    private int positionId;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    private String modelName;
    private String colorName;
    private String brandName;
    private String imagePath;
    private String gearTypeName;
    private String fuelTypeName;
    private String carTypeName;
    private String positionCity;
    private String brandLogoPath;
}
