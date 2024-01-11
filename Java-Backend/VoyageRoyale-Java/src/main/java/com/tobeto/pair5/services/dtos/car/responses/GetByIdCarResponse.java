package com.tobeto.pair5.services.dtos.car.responses;

import com.tobeto.pair5.services.dtos.color.responses.GetColorNameResponse;
import com.tobeto.pair5.services.dtos.model.responses.GetModelNameResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarResponse {
    private int id;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;

    private GetModelNameResponse modelName;
    private GetColorNameResponse colorName;

}
