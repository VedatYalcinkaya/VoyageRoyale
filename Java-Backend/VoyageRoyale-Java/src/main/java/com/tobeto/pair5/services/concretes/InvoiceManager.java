package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Invoice;
import com.tobeto.pair5.repositories.InvoiceRepository;
import com.tobeto.pair5.services.abstracts.InvoiceService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.requests.UpdateInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.responses.GetAllInvoiceResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class InvoiceManager implements InvoiceService {
    private InvoiceRepository invoiceRepository;
    private ModelMapperService modelMapperService;
    @Override
    public void add(AddInvoiceRequest request) {
        Invoice invoice = this.modelMapperService.forRequest().map(request, Invoice.class);
        invoiceRepository.save(invoice);
    }

    @Override
    public void delete(int id) {
        Invoice invoiceToDelete = invoiceRepository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.invoiceNotExist));
        invoiceRepository.delete(invoiceToDelete);
    }

    @Override
    public void update(UpdateInvoiceRequest request) {
        Invoice invoiceToUpdate = invoiceRepository.findById(request.getId())
                .orElseThrow(()-> new BusinessException(Messages.invoiceNotExist));

        this.modelMapperService.forRequest().map(request, invoiceToUpdate);

        invoiceRepository.saveAndFlush(invoiceToUpdate);
    }

    @Override
    public List<GetAllInvoiceResponse> getAll() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoices.stream()
                .map(invoice -> this.modelMapperService.forResponse().map(invoice, GetAllInvoiceResponse.class))
                .toList();
    }

    @Override
    public GetAllInvoiceResponse getById(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.invoiceNotExist));
        GetAllInvoiceResponse response = this.modelMapperService.forResponse().map(invoice, GetAllInvoiceResponse.class);
        return response;
    }

    @Override
    public GetAllInvoiceResponse getInvoiceByRentalId(int id) {
        Invoice invoice = invoiceRepository.findByRentalId(id).orElseThrow(()-> new BusinessException(Messages.invoiceNotExist));
        GetAllInvoiceResponse response = this.modelMapperService.forResponse().map(invoice, GetAllInvoiceResponse.class);
        return response;
    }


}
