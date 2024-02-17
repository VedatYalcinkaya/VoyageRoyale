package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.a.Mernis.GBFKPSPublicSoap;
import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Customer;
import com.tobeto.pair5.repositories.CustomerRepository;
import com.tobeto.pair5.services.abstracts.CustomerService;
import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.customer.requests.AddCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.CustomUpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.DeleteCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.UpdateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair5.services.dtos.customer.responses.GetCustomerByIdResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public void add(AddCustomerRequest request) throws Exception {

        checkIsIdentityNumberAlreadyExists(request.getTcNo());
        chcekIsUserExist(request.getUserId());
        Customer customer = this.modelMapperService.forRequest().map(request,Customer.class);
        checkIsUserRealPerson(customer);
        customerRepository.save(customer);
    }

    @Override
    public void delete(int id) {
        Customer customerToDelete = customerRepository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.customerNotExists));

        customerRepository.delete(customerToDelete);
        userService.delete(customerToDelete.getUser().getId());

    }

    @Override
    public void update(UpdateCustomerRequest request) {

        Customer customerToUpdate = customerRepository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.customerNotExists));
        chcekIsUserExist(request.getUserId());
        this.modelMapperService.forRequest().map(request, customerToUpdate);

        customerRepository.saveAndFlush(customerToUpdate);
    }

    @Override
    public void customUpdate(CustomUpdateCustomerRequest request) {
        Customer customerToUpdate = customerRepository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.customerNotExists));
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

    @Override
    public GetCustomerByIdResponse getById(int id) {
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.customerNotExists));
        GetCustomerByIdResponse customerByIdResponse = this.modelMapperService.forResponse().map(customer,GetCustomerByIdResponse.class);
        return customerByIdResponse;
    }

    @Override
    public GetCustomerByIdResponse getByEmail(String email) {
        Customer customer = customerRepository.findByUserEmail(email).orElseThrow(()-> new BusinessException(Messages.customerNotExists));
        GetCustomerByIdResponse customerResponse = modelMapperService.forResponse().map(customer,GetCustomerByIdResponse.class);
        return customerResponse;
    }

    private void checkIsIdentityNumberAlreadyExists(String identityNumber){
        if (customerRepository.findByTcNo(identityNumber).isPresent()){
            throw new BusinessException(Messages.identityNumberAlreadyExists);
        }
    }
    private void chcekIsUserExist(int userId){
        if (!userService.existsUserById(userId)){
            throw new BusinessException(Messages.userNotFound);
        }
    }

    private void checkIsUserRealPerson(Customer request) throws Exception {
        GBFKPSPublicSoap client= new GBFKPSPublicSoap();
        boolean isRealPerson= client.TCKimlikNoDogrula(Long.valueOf(request.getTcNo()), request.getFirstName(), request.getLastName(), request.getBirthDate());
        if(!isRealPerson) {
            {
                throw new BusinessException(Messages.userNotRealPerson);
            }
        }
    }
}
