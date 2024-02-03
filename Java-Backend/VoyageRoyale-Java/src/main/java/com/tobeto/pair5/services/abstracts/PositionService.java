package com.tobeto.pair5.services.abstracts;


import com.tobeto.pair5.services.dtos.position.requests.AddPositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.DeletePositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.UpdatePositionRequest;
import com.tobeto.pair5.services.dtos.position.responses.GetAllPositionResponse;
import com.tobeto.pair5.services.dtos.position.responses.GetPositionByIdResponse;

import java.util.List;

public interface PositionService {
    void add(AddPositionRequest request);
    void delete(int id);
    void update(UpdatePositionRequest request);
    GetPositionByIdResponse getById(int id);
    List<GetAllPositionResponse> getAll();

}
