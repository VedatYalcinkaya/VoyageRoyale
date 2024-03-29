package com.tobeto.pair5.services.abstracts;


import com.tobeto.pair5.services.dtos.corporateCustomer.requests.AddCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.CustomUpdateCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.DeleteCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.UpdateCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.responses.GetCorporateCustomerByEmail;
import com.tobeto.pair5.services.dtos.corporateCustomer.responses.GetCorporateCustomerResponse;


import java.util.List;

public interface CorporateCustomerService {
    void add(AddCorporateCustomerRequest request);
    void delete(int id);
    void update(UpdateCorporateCustomerRequest request);
    void customUpdate(CustomUpdateCorporateCustomerRequest request);

    List<GetCorporateCustomerResponse> getAll();
    GetCorporateCustomerResponse getById(int id);

    GetCorporateCustomerByEmail getByEmail(String email);
}
