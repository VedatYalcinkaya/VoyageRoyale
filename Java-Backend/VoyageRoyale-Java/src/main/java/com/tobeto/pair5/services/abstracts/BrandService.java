package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.DeleteBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair5.services.dtos.brand.responses.GetAllBrandResponse;

import java.util.List;

public interface BrandService {
    void add(AddBrandRequest request);
    void delete(int id);
    void update(UpdateBrandRequest request);
    List<GetAllBrandResponse> getAll();
    GetAllBrandResponse getById(int id);
}
