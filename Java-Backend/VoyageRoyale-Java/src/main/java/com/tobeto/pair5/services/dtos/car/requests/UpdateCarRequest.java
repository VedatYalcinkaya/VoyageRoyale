package com.tobeto.pair5.services.dtos.car.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCarRequest {

    @Positive(message = "Id must be a positive number!")
    @NotNull(message = "Id can not be empty!")
    private int id;

    @Positive(message = "kilometer must be a positive number!")
    private int kilometer;

    @Pattern(regexp = "^(0[1-9]|[1-8][0-9]|9[0-8])[A-Z\\s]{1,3}\\d{2,4}$", message = "Invalid Turkish license plate format!")
    private String plate;

    @Min(value = 2005, message = "Year must be at least 2005")
    @Max(value = 2024, message = "Year can not be more than 2024")
    private int year;

    @Positive
    private double dailyPrice;

    @Positive(message = "modelId must be a positive number!")
    private int modelId;

    @Positive(message = "colorId must be a positive number!")
    private int colorId;

    @Positive(message = "Gear Type ID must be a positive number!")
    private int gearTypeId;

    @Positive(message = "Fuel Type ID must be a positive number!")
    private int fuelTypeId;

    @Positive(message = "Car Type ID must be a positive number!")
    private int carTypeId;

    @Positive(message = "Position ID must be a positive number!")
    private int positionId;
}
