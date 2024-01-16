package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.gearType.requests.AddGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.DeleteGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.UpdateGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.responses.GetAllGearTypeResponse;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
public interface GearTypeService {
    void add(AddGearTypeRequest request);
    void delete(DeleteGearTypeRequest request);
    void update(UpdateGearTypeRequest request);
    List<GetAllGearTypeResponse> getAll();
    GetAllGearTypeResponse getById(int id);
}
