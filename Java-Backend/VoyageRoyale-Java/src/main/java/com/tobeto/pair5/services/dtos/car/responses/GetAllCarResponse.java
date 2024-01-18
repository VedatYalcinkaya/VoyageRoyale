package com.tobeto.pair5.services.dtos.car.responses;

import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
import com.tobeto.pair5.services.dtos.model.responses.GetAllModelResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCarResponse {
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

}
