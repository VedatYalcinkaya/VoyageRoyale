package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.entities.concretes.GearType;
import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
import com.tobeto.pair5.services.dtos.gearType.requests.AddGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.DeleteGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.UpdateGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.responses.GetAllGearTypeResponse;

import java.util.List;

public interface GearTypeService {

    void add(AddGearTypeRequest request);
    void delete(DeleteGearTypeRequest request);
    void update(UpdateGearTypeRequest request);
    GetAllGearTypeResponse getById(int id);
    List<GetAllGearTypeResponse> getAll();
}
