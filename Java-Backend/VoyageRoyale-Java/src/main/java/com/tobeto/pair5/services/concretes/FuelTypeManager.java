package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.FuelType;
import com.tobeto.pair5.repositories.FuelTypeRepository;
import com.tobeto.pair5.services.abstracts.FuelTypeService;
import com.tobeto.pair5.services.dtos.fuelType.requests.AddFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.DeleteFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.UpdateFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetAllFuelTypeResponse;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetFuelTypeByIdResponse;
import com.tobeto.pair5.services.dtos.position.responses.GetPositionByIdResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FuelTypeManager implements FuelTypeService {
    private final FuelTypeRepository fuelTypeRepository;
    private final ModelMapperService modelMapperService;
    @Override
    public void add(AddFuelTypeRequest request) {
        FuelType fuelTypeToAdd = modelMapperService.forRequest().map(request, FuelType.class);
        fuelTypeRepository.save(fuelTypeToAdd);
    }

    @Override
    public void delete(DeleteFuelTypeRequest request) {
        FuelType fuelTypeToDelete = fuelTypeRepository.findById(request.getId()).orElseThrow();
        fuelTypeRepository.delete(fuelTypeToDelete);
    }

    @Override
    public void update(UpdateFuelTypeRequest request) {
        FuelType fuelTypeToUpdate = fuelTypeRepository.findById(request.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(request, fuelTypeToUpdate);
        fuelTypeRepository.saveAndFlush(fuelTypeToUpdate);
    }

    @Override
    public GetFuelTypeByIdResponse getById(int id) {
        FuelType fuelType = fuelTypeRepository.findById(id).orElseThrow();
        GetFuelTypeByIdResponse response = modelMapperService.forResponse().map(fuelType, GetFuelTypeByIdResponse.class);
        return response;
    }

    @Override
    public List<GetAllFuelTypeResponse> getAll() {
        List<FuelType> fuelTypes = fuelTypeRepository.findAll();
        List<GetAllFuelTypeResponse> responses = fuelTypes.stream().map(fuelType -> this.modelMapperService.forResponse().map(fuelType, GetAllFuelTypeResponse.class))
                .toList();
        return responses;
    }
}
