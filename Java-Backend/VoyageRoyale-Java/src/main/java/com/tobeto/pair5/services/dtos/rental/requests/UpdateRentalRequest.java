package com.tobeto.pair5.services.dtos.rental.requests;

import com.tobeto.pair5.services.dtos.car.responses.GetCarIdResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetUserIdResponse;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRentalRequest {
    @Positive(message = "Please enter a valid Id.")
    private int id;
    private LocalDate startDate;
    private LocalDate endDate;
    private int startKilometer;
    private int endKilometer;
    private int carId;
    private int userId;
}
