package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Invoice;
import com.tobeto.pair5.entities.concretes.Rental;
import com.tobeto.pair5.repositories.RentalRepository;
import com.tobeto.pair5.services.abstracts.CarService;
import com.tobeto.pair5.services.abstracts.InvoiceService;
import com.tobeto.pair5.services.abstracts.RentalService;
import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair5.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair5.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.DeleteRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair5.services.dtos.rental.responses.GetAllRentalResponse;
import com.tobeto.pair5.services.dtos.rental.responses.GetByIdRentalResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetByIdUserResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RentalManager implements RentalService {
    private final RentalRepository rentalRepository;
    private ModelMapperService modelMapperService;
    private CarService carService;
    private UserService userService;
    private InvoiceService invoiceService;

    @Override
    public void add(AddRentalRequest request) {

        checkIsStartDateBeforeThanEndDate(request.getStartDate(), request.getEndDate());
        checkIsCarExists(request.getCarId());
        checkIsUserExists(request.getUserId());
        checkIsRentalValid(request.getStartDate(), request.getEndDate(), 25);

        Rental rental = this.modelMapperService.forRequest().map(request, Rental.class);
        rentalRepository.save(rental);

        GetByIdCarResponse carResponse = carService.getById(request.getCarId());

        double totalPrice = calculateTotalPrice(request.getStartDate(), request.getEndDate(), carResponse.getDailyPrice());
        Invoice invoice = new Invoice();
        invoice.setTotalPrice((float) totalPrice);
        invoice.setTaxRate(1.00F);
        invoice.setInvoiceNo(UUID.randomUUID().toString());
        invoice.setRental(rental);

        AddInvoiceRequest requestInvoice = modelMapperService.forRequest().map(invoice, AddInvoiceRequest.class);
        invoiceService.add(requestInvoice);

        rental.setStartKilometer(carResponse.getKilometer());

        rentalRepository.save(rental);
    }


    @Override
    public void delete(int id) {
        Rental rentalToDelete = rentalRepository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.rentalNotExist));
        rentalRepository.delete(rentalToDelete);
    }

    @Override
    public void update(UpdateRentalRequest request) {
        Rental rentalToUpdate = rentalRepository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.rentalNotExist));

        checkIsStartDateBeforeThanEndDate(request.getStartDate(), request.getEndDate());
        checkIsCarExists(request.getCar().getId());
        checkIsUserExists(request.getUser().getId());
        checkIsRentalValid(request.getStartDate(), request.getEndDate(), 25);

        Rental rental = this.modelMapperService.forRequest().map(request, Rental.class);

        GetByIdCarResponse carResponse = carService.getById(request.getCar().getId());

        rental.setStartKilometer(carResponse.getKilometer());

        //rental.setTotalPrice(calculateTotalPrice(request.getStartDate(), request.getEndDate(),carResponse.getDailyPrice()));

        this.modelMapperService.forRequest().map(request, rentalToUpdate);
        rentalRepository.saveAndFlush(rentalToUpdate);
    }

    @Override
    public List<GetAllRentalResponse> getAll() {
        List<Rental> rentals = rentalRepository.findAll();
        List<GetAllRentalResponse> responses = rentals.stream().map(rental -> this.modelMapperService.forResponse().map(rental, GetAllRentalResponse.class))
                .toList();
        return responses;
    }

    @Override
    public GetByIdRentalResponse getById(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.rentalNotExist));
        GetByIdRentalResponse response = this.modelMapperService.forResponse().map(rental, GetByIdRentalResponse.class);
        return response;
    }

    private void checkIsRentalValid(LocalDate start, LocalDate end, int maxDays){
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        if (!(daysBetween >= 0 && daysBetween <= maxDays)){
            throw new BusinessException(Messages.rentException);
        }
    }

    private double calculateTotalPrice(LocalDate start, LocalDate end, double dailyPrice){
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        return daysBetween * dailyPrice;
    }

    private void checkIsStartDateBeforeThanEndDate (LocalDate startDate, LocalDate endDate){
        if (endDate.isBefore(startDate)){
            throw new BusinessException(Messages.dateException);
        }
    }

    private void checkIsCarExists(int carId){
        try {
            GetByIdCarResponse car = carService.getById(carId);
        }catch (NoSuchElementException ex) {
            throw new BusinessException(Messages.carNotFound);
        }
    }

    private void checkIsUserExists(int userId){
        try {
            GetByIdUserResponse user = userService.getById(userId);
        }catch (NoSuchElementException ex) {
            throw new BusinessException(Messages.userNotFound);
        }
    }
}

