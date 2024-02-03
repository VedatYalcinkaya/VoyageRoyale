package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.DeleteModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair5.services.dtos.model.responses.GetAllModelResponse;

import java.util.List;

public interface ModelService{
    void add(AddModelRequest request);
    void delete(int id);
    void update(UpdateModelRequest request);

    List<GetAllModelResponse> getAll();
    GetAllModelResponse getById(int id);
}
