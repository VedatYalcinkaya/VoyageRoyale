package com.tobeto.pair5.controllers;

import com.tobeto.pair5.entities.concretes.Customer;
import com.tobeto.pair5.services.abstracts.CustomerService;
import com.tobeto.pair5.services.dtos.customer.requests.AddCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.DeleteCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.UpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair5.services.dtos.customer.responses.GetCustomerByIdResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/customers")
@CrossOrigin
public class CustomerController {
    private CustomerService customerService;

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddCustomerRequest request){
        customerService.add(request);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid DeleteCustomerRequest request){
        customerService.delete(request);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateCustomerRequest request) {
        customerService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllCustomerResponse> getAll(){return customerService.getAll();}

    @GetMapping("/getById")
    public GetCustomerByIdResponse getById(@RequestParam @Valid int id){return customerService.getById(id);}
}
