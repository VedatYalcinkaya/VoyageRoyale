package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.GearType;
import com.tobeto.pair5.repositories.GearTypeRepository;
import com.tobeto.pair5.services.abstracts.GearTypeService;
import com.tobeto.pair5.services.dtos.gearType.requests.AddGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.DeleteGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.UpdateGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.responses.GetAllGearTypeResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GearTypeManager implements GearTypeService {
    private ModelMapperService modelMapperService;

    private GearTypeRepository gearTypeRepository;



    public void add(AddGearTypeRequest request) {
        checkIsGearTypeAlreadyExists(request.getName());

        GearType gearType = this.modelMapperService.forRequest().map(request, GearType.class);
        gearTypeRepository.save(gearType);
    }


    public void delete(DeleteGearTypeRequest request) {
        GearType gearTypeToDelete = gearTypeRepository.findById(request.getId()).orElseThrow();
        gearTypeRepository.delete(gearTypeToDelete);
    }


    public void update(UpdateGearTypeRequest request) {
        GearType gearTypeToUpdate = gearTypeRepository.findById(request.getId())
                .orElseThrow();
        checkIsGearTypeAlreadyExists(request.getName());

        this.modelMapperService.forRequest().map(request, gearTypeToUpdate);


        gearTypeRepository.saveAndFlush(gearTypeToUpdate);
    }

    public GetAllGearTypeResponse getById(int id) {
        GearType gearType = gearTypeRepository.findById(id).orElseThrow();
        GetAllGearTypeResponse response = this.modelMapperService.forResponse().map(gearType,GetAllGearTypeResponse.class);
        return response;
    }


    public List<GetAllGearTypeResponse> getAll() {
        List<GearType> gearTypes = gearTypeRepository.findAll();
        List<GetAllGearTypeResponse> response = gearTypes.stream()
                .map(gearType -> this.modelMapperService.forResponse().map(gearType,GetAllGearTypeResponse.class))
                .toList();
        return  response;
    }

    public void checkIsGearTypeAlreadyExists(String gearType) {
        if (gearTypeRepository.existsByNameIgnoreCase(gearType)) {
            throw new RuntimeException("GearType already exists");
        }
    }
}
