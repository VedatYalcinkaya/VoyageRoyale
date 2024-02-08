package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.CorporateCustomerService;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.AddCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.DeleteCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.UpdateCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.corporateCustomer.responses.GetCorporateCustomerResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/corporateCustomers")
@CrossOrigin
public class CorporateCustomersController {

    private final CorporateCustomerService corporateCustomerService;
    @PostMapping("/add")
    public void add(@RequestBody @Valid AddCorporateCustomerRequest request){
        corporateCustomerService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id) {
        corporateCustomerService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateCorporateCustomerRequest request) {
        corporateCustomerService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetCorporateCustomerResponse> getAll(){
        return corporateCustomerService.getAll();
    }

    @GetMapping("/getById")
    public GetCorporateCustomerResponse getById(@RequestParam int id) {
        return corporateCustomerService.getById(id);
    }
}
