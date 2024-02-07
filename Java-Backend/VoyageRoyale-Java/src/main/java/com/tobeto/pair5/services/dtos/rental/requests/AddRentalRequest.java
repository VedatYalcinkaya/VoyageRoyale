package com.tobeto.pair5.services.dtos.rental.requests;
import com.tobeto.pair5.services.dtos.car.responses.GetCarIdResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetUserIdResponse;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRentalRequest {
    @FutureOrPresent(message = "When renting a car, the start date cannot be before today.")
    private LocalDate startDate;
    private LocalDate endDate;
    private int carId;
    private int userId;
}
