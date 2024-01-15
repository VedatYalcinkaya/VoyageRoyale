package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.carType.requests.AddCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.DeleteCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.UpdateCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.responses.GetAllCarTypeResponse;
import com.tobeto.pair5.services.dtos.carType.responses.GetCarTypeByIdResponse;

import java.util.List;

public interface CarTypeService{
    void add(AddCarTypeRequest request);
    void delete(DeleteCarTypeRequest request);
    void update(UpdateCarTypeRequest request);
    GetCarTypeByIdResponse getById(int id);
    List<GetAllCarTypeResponse> getAll();
}
