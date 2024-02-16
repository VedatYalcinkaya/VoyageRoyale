package com.tobeto.pair5.services.dtos.rental.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetCustomRentalResponse {
    private int id;
    private LocalDate startDate;
    private LocalDate  endDate;
    private int startKilometer;
    private int endKilometer;
    private String carPlate;
    private String carImagePath;
    private String userEmail;
    private float invoicesTotalPrice;
    private float carDailyPrice;
}
