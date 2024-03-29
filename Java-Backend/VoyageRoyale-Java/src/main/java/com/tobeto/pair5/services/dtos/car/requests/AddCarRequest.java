package com.tobeto.pair5.services.dtos.car.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    @Positive(message = "kilometer must be a positive number!")
    private int kilometer;

    @Pattern(regexp = "(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\\d{4,5})|([A-Z]{2})(\\d{3,4})|([A-Z]{3})(\\d{2}))", message = "Invalid Turkish license plate format!")
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

    @Positive(message = "Gear Type ID must be a positive number!")
    private int gearTypeId;

    @Positive(message = "Fuel Type ID must be a positive number!")
    private int fuelTypeId;

    @Positive(message = "Car Type ID must be a positive number!")
    private int carTypeId;

    @Positive(message = "Position ID must be a positive number!")
    private int positionId;

    @NotNull
    private String imagePath;



}
