package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.FuelType;
import com.tobeto.pair5.repositories.FuelTypeRepository;
import com.tobeto.pair5.services.abstracts.FuelTypeService;
import com.tobeto.pair5.services.constants.Messages;
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
        validateFuelTypeName(request.getFuel_name());

        FuelType fuelTypeToAdd = modelMapperService.forRequest().map(request, FuelType.class);
        fuelTypeRepository.save(fuelTypeToAdd);
    }

    private void validateFuelTypeName(String fuelName){
        if(fuelName == null || fuelName.length() < 3){
            throw new BusinessException(Messages.fuelTypeInvalidName);
        }
    }

    @Override
    public void delete(int id) {
        FuelType fuelTypeToDelete = fuelTypeRepository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.fuelTypeNotExist));
        fuelTypeRepository.delete(fuelTypeToDelete);
    }

    @Override
    public void update(UpdateFuelTypeRequest request) {
        FuelType fuelTypeToUpdate = fuelTypeRepository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.fuelTypeNotExist));
        this.modelMapperService.forRequest().map(request, fuelTypeToUpdate);
        fuelTypeRepository.saveAndFlush(fuelTypeToUpdate);
    }

    @Override
    public GetFuelTypeByIdResponse getById(int id) {
        FuelType fuelType = fuelTypeRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.fuelTypeNotExist));
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
