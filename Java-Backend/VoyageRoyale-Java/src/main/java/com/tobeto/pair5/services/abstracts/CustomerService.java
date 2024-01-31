package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.customer.requests.AddCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.CustomUpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.DeleteCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.UpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair5.services.dtos.customer.responses.GetCustomerByIdResponse;

import java.util.List;

public interface CustomerService {
    void add(AddCustomerRequest request);
    void delete(DeleteCustomerRequest request);

    void update(UpdateCustomerRequest request);

    void customUpdate(CustomUpdateCustomerRequest request);

    List<GetAllCustomerResponse> getAll();

    GetCustomerByIdResponse getById(int id);




}
