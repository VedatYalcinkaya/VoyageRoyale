package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.CarType;
import com.tobeto.pair5.repositories.CarTypeRepository;
import com.tobeto.pair5.repositories.ModelRepository;
import com.tobeto.pair5.services.abstracts.CarTypeService;
import com.tobeto.pair5.services.dtos.carType.requests.AddCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.DeleteCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.UpdateCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.responses.GetAllCarTypeResponse;
import com.tobeto.pair5.services.dtos.carType.responses.GetCarTypeByIdResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class CarTypeManager implements CarTypeService {

    private final CarTypeRepository carTypeRepository;
    private final ModelMapperService modelMapperService;
    private final ModelRepository modelRepository;

    @Override
    public void add(AddCarTypeRequest request) {
        CarType carTypeToAdd = modelMapperService.forRequest().map(request, CarType.class);
        carTypeRepository.save(carTypeToAdd);
    }

    @Override
    public void delete(DeleteCarTypeRequest request) {
        CarType carTypeToDelete = carTypeRepository.findById(request.getId()).orElseThrow();
        carTypeRepository.delete(carTypeToDelete);
    }

    @Override
    public void update(UpdateCarTypeRequest request) {
        CarType carTypeToUpdate = carTypeRepository.findById(request.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(request,carTypeToUpdate);
        carTypeRepository.saveAndFlush(carTypeToUpdate);
    }

    @Override
    public GetCarTypeByIdResponse getById(int id) {
        CarType carType = carTypeRepository.findById(id).orElseThrow();
        GetCarTypeByIdResponse response = modelMapperService.forResponse().map(carType, GetCarTypeByIdResponse.class);
        return response;
    }

    @Override
    public List<GetAllCarTypeResponse> getAll() {
        List<CarType> carTypes = carTypeRepository.findAll();
        List<GetAllCarTypeResponse> response =
                carTypes.stream()
                        .map((carType) -> this.modelMapperService.forResponse().map(carType, GetAllCarTypeResponse.class)).toList();
        return  response;
    }
}
