package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Car;
import com.tobeto.pair5.repositories.CarRepository;
import com.tobeto.pair5.services.abstracts.CarService;
import com.tobeto.pair5.services.abstracts.ColorService;
import com.tobeto.pair5.services.abstracts.ModelService;
import com.tobeto.pair5.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.DeleteCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair5.services.dtos.car.responses.GetAllCarResponse;
import com.tobeto.pair5.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair5.services.dtos.car.responses.GetCarsByPickUpDateAndReturnDateAndPosition;
import com.tobeto.pair5.services.dtos.car.responses.GetCustomCarResponse;
import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
import com.tobeto.pair5.services.dtos.model.responses.GetAllModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CarManager implements CarService {
    private ModelMapperService modelMapperService;
    private CarRepository carRepository;
    private ModelService modelService;
    private ColorService colorService;

    @Override
    public void add(AddCarRequest request) {
        checkIsModelExists(request.getModelId());
        checkIsColorExists(request.getColorId());
        checkIsPlateAlreadyExists(request.getPlate());

        Car car = this.modelMapperService.forRequest().map(request, Car.class);
        car.getPlate().replaceAll("\\s","");
        carRepository.save(car);
    }

    @Override
    public void delete(DeleteCarRequest request) {
        Car carToDelete = carRepository.findById(request.getId()).orElseThrow();
        carRepository.delete(carToDelete);
    }

    @Override
    public void update(UpdateCarRequest request) {
        checkIsModelExists(request.getModelId());
        checkIsColorExists(request.getColorId());

        Car carToUpdate = carRepository.findById(request.getId())
                .orElseThrow();

        this.modelMapperService.forRequest().map(request, carToUpdate);
        carToUpdate.getPlate().replaceAll("\\s","");


        carRepository.saveAndFlush(carToUpdate);
    }

    @Override
    public List<GetAllCarResponse> getAll() {
        List<Car> cars = carRepository.findAll();
        List<GetAllCarResponse> carResponses = cars.stream()
                .map(car -> this.modelMapperService
                        .forResponse().map(car, GetAllCarResponse.class))
                .collect(Collectors.toList());
        return carResponses;
    }

    @Override
    public GetByIdCarResponse getById(int id) {
       Car car = carRepository.findById(id).orElseThrow();
       GetByIdCarResponse carResponses = this.modelMapperService.forResponse().map(car, GetByIdCarResponse.class);
       return carResponses;
    }

    @Override
    public List<GetCustomCarResponse> getAllCustom() {
        List<Car> cars = carRepository.findAll();
        List<GetCustomCarResponse> carResponses = cars.stream()
                .map(car -> this.modelMapperService
                        .forResponse().map(car, GetCustomCarResponse.class))
                .collect(Collectors.toList());
        return carResponses;

    }

    @Override
    public List<GetCarsByPickUpDateAndReturnDateAndPosition> getCarsByReservationInputs(LocalDate pickUpDate, LocalDate returnDate, int positionId) {
        List<Car> cars = carRepository.findAvailableCars(pickUpDate,returnDate,positionId);
        List<GetCarsByPickUpDateAndReturnDateAndPosition> carResponses = cars.stream()
                .map(car -> this.modelMapperService
                        .forResponse().map(car, GetCarsByPickUpDateAndReturnDateAndPosition.class))
                .collect(Collectors.toList());
        return carResponses;
    }


    private void checkIsModelExists(int modelId) {
        try {
            GetAllModelResponse model = modelService.getById(modelId);
        } catch (NoSuchElementException ex) {
            throw new RuntimeException("Model not found!");
        }
    }

    private void checkIsColorExists(int colorId) {
        try {
            GetAllColorResponse color= colorService.getById(colorId);
        }catch (NoSuchElementException ex) {
            throw new RuntimeException("Color not found!");
        }
    }

    private void checkIsPlateAlreadyExists(String plate){
        if (carRepository.existsByPlate(plate)){
            throw new RuntimeException(("Plate is already exists!"));
        }
    }


}
