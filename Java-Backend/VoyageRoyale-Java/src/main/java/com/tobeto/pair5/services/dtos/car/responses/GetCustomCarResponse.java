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
    private String plate;
    private int kilometer;
    private double dailyPrice;
    private int modelYear;

    private GetModelNameResponse modelName;
    private GetColorNameResponse colorName;
    private GetBrandNameResponse brandName;

}
