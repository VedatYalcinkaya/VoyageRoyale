package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.fuelType.requests.AddFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.DeleteFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.UpdateFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetAllFuelTypeResponse;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetFuelTypeByIdResponse;

import java.util.List;

public interface FuelTypeService {
    void add(AddFuelTypeRequest request);
    void delete(int id);
    void update(UpdateFuelTypeRequest request);
    GetFuelTypeByIdResponse getById(int id);
    List<GetAllFuelTypeResponse> getAll();
}
