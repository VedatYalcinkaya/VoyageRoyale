package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.entities.concretes.Car;
import com.tobeto.pair5.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.DeleteCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair5.services.dtos.car.responses.*;

import java.time.LocalDate;
import java.util.List;

public interface CarService {
    void add(AddCarRequest request);
    void delete(DeleteCarRequest request);
    void update(UpdateCarRequest request);

    List<GetAllCarResponse> getAll();
    GetByIdCarResponse getById(int id);

    List<GetCustomCarResponse> getAllCustom();

    List<GetCarsByPickUpDateAndReturnDateAndPosition> getCarsByReservationInputs(LocalDate pickUpDate, LocalDate returnDate, int positionId);

    List<GetCarsByPositionIdResponse> getCarsByPositionId(int id);
}
