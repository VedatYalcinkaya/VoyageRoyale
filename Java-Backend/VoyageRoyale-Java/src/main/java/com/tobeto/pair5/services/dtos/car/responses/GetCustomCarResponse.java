package com.tobeto.pair5.services.dtos.car.responses;

import com.tobeto.pair5.services.dtos.brand.responses.GetBrandNameResponse;
import com.tobeto.pair5.services.dtos.color.responses.GetColorNameResponse;
import com.tobeto.pair5.services.dtos.model.responses.GetModelNameResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCustomCarResponse {
    private int id;
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
    private String positionName;
    private String brandLogoPath;
}
