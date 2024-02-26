package com.tobeto.pair5.services.dtos.rental.requests;
import com.tobeto.pair5.services.dtos.car.responses.GetCarIdResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetUserIdResponse;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRentalRequest {

    private LocalDate startDate;

    private LocalDate endDate;
    @Positive(message = "Car ID must be positive")
    private int carId;
    @Positive(message = "User ID must be positive")
    private int userId;
}
