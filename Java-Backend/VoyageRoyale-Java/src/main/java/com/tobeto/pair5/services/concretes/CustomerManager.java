package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Customer;
import com.tobeto.pair5.repositories.CustomerRepository;
import com.tobeto.pair5.services.abstracts.CustomerService;
import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.dtos.customer.requests.AddCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.DeleteCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.UpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.responses.GetAllCustomerResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CustomerManager implements CustomerService {
    private ModelMapperService modelMapperService;
    private CustomerRepository customerRepository;
    private UserService userService;
    @Override
    public void add(AddCustomerRequest request) {

        Customer customer = this.modelMapperService.forRequest().map(request,Customer.class);
        customerRepository.save(customer);
    }

    @Override
    public void delete(DeleteCustomerRequest request) {
        Customer customerToDelete = customerRepository.findById(request.getId()).orElseThrow();
        customerRepository.delete(customerToDelete);

    }

    @Override
    public void update(UpdateCustomerRequest request) {

        Customer customerToUpdate = customerRepository.findById(request.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(request, customerToUpdate);

        customerRepository.saveAndFlush(customerToUpdate);
    }

    @Override
    public List<GetAllCustomerResponse> getAll() {
        List<Customer> customers = customerRepository.findAll();
        List<GetAllCustomerResponse> customerResponses = customers.stream()
                .map(customer -> this.modelMapperService
                        .forResponse().map(customer, GetAllCustomerResponse.class))
                .collect(Collectors.toList());
        return customerResponses;
    }
}
