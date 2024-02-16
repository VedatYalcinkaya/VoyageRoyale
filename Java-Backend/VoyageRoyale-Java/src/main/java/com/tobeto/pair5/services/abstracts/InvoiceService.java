package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.requests.DeleteInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.requests.UpdateInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.responses.GetAllInvoiceResponse;

import java.util.List;

public interface InvoiceService {
    void add(AddInvoiceRequest request);
    void delete(int id);
    void update(UpdateInvoiceRequest request);
    List<GetAllInvoiceResponse> getAll();
    GetAllInvoiceResponse getById(int id);

    GetAllInvoiceResponse getInvoiceByRentalId(int id);
}
