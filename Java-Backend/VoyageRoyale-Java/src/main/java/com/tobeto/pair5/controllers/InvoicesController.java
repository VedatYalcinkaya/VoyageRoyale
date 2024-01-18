package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.InvoiceService;
import com.tobeto.pair5.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.requests.DeleteInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.requests.UpdateInvoiceRequest;
import com.tobeto.pair5.services.dtos.invoice.responses.GetAllInvoiceResponse;
import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/invoices")
@CrossOrigin
public class InvoicesController {
    private final InvoiceService invoiceService;

    @PostMapping("/add")
    public void add(@RequestBody @Valid AddInvoiceRequest request){
        invoiceService.add(request);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid DeleteInvoiceRequest request){
        invoiceService.delete(request);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateInvoiceRequest request){
        invoiceService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllInvoiceResponse> getAll(){
        return invoiceService.getAll();
    }

    @GetMapping("/getById")
    public GetAllInvoiceResponse getById(@RequestParam int id){
        return invoiceService.getById(id);
    }
}
