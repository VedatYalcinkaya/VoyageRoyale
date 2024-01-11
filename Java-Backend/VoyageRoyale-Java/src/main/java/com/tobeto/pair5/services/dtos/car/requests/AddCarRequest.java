package com.tobeto.pair5.services.dtos.car.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    @Positive(message = "kilometer must be a positive number!")
    private int kilometer;

    @Pattern(regexp = "^(0[1-9]|[1-8][0-9]|9[0-8])[A-Z\\s]{1,3}\\d{2,4}$", message = "Invalid Turkish license plate format!")
    private String plate;

    public void setPlate(String plate) {
        this.plate = plate != null ? plate.replaceAll("\\s", "") : null;
    }


    @Min(value = 2005, message = "Year must be at least 2005")
    @Max(value = 2024, message = "Year can not be more than 2024")
    private int year;
    @Positive
    private double dailyPrice;
    @Positive(message = "modelId must be a positive number!")
    private int modelId;
    @Positive(message = "colorId must be a positive number!")
    private int colorId;



}
