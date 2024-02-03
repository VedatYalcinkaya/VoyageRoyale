package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.DeleteRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair5.services.dtos.rental.responses.GetAllRentalResponse;
import com.tobeto.pair5.services.dtos.rental.responses.GetByIdRentalResponse;

import java.util.List;

public interface RentalService {

    void add(AddRentalRequest request);

    void delete(int id);

    void update(UpdateRentalRequest request);

    List<GetAllRentalResponse> getAll();
    GetByIdRentalResponse getById(int id);
}
