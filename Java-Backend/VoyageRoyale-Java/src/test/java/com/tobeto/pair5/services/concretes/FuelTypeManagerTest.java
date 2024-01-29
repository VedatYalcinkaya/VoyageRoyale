package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.FuelType;
import com.tobeto.pair5.repositories.FuelTypeRepository;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.fuelType.requests.AddFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.DeleteFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.UpdateFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetAllFuelTypeResponse;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetFuelTypeByIdResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class FuelTypeManagerTest {
    private FuelTypeManager fuelTypeManager;

    @Mock
    private FuelTypeRepository fuelTypeRepository;

    @Mock
    private ModelMapperService modelMapperService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper modelMapper = Mockito.mock(ModelMapper.class);
        Mockito.when(modelMapperService.forRequest()).thenReturn(modelMapper);
        Mockito.when(modelMapperService.forResponse()).thenReturn(modelMapper);
        fuelTypeManager = new FuelTypeManager(fuelTypeRepository, modelMapperService);
    }

    @AfterEach
    void tearDown() {

    }

    @Test
    void addFuelTypeShouldSuccessfullyAddNewFuelType(){
        AddFuelTypeRequest fuelTypeRequest = new AddFuelTypeRequest();
        fuelTypeRequest.setFuel_name("Gasoline");

        Mockito.when(modelMapperService.forRequest().map(fuelTypeRequest, FuelType.class)).thenReturn(new FuelType());
        Mockito.when(fuelTypeRepository.save(Mockito.any(FuelType.class))).thenReturn(new FuelType());

        assertDoesNotThrow(() -> fuelTypeManager.add(fuelTypeRequest));
    }

    @Test
    void addFuelTypeWithInvalidNameShouldThrowException(){
        AddFuelTypeRequest fuelTypeRequest = new AddFuelTypeRequest();
        fuelTypeRequest.setFuel_name("ab");

        BusinessException exception = assertThrows(BusinessException.class,
                () -> fuelTypeManager.add(fuelTypeRequest));
        assertEquals(Messages.fuelTypeInvalidName, exception.getMessage());
    }

    @Test
    void deleteFuelTypeShouldSuccessfullyDeleteExistingFuelType(){
        DeleteFuelTypeRequest fuelTypeRequestToDelete = new DeleteFuelTypeRequest();
        fuelTypeRequestToDelete.setId(1);
        Mockito.when(fuelTypeRepository.findById(1)).thenReturn(Optional.of(new FuelType()));

        assertDoesNotThrow(() -> fuelTypeManager.delete(fuelTypeRequestToDelete));
    }

    @Test
    void updateFuelTypeShouldSuccessfullyUpdateFuelType(){
        UpdateFuelTypeRequest fuelTypeRequestToUpdate = new UpdateFuelTypeRequest();
        fuelTypeRequestToUpdate.setId(1);
        fuelTypeRequestToUpdate.setFuel_name("Gasoline");
        Mockito.when(fuelTypeRepository.findById(1)).thenReturn(Optional.of(new FuelType()));
        Mockito.when(modelMapperService.forRequest().map(fuelTypeRequestToUpdate, FuelType.class)).thenReturn(new FuelType());

        assertDoesNotThrow(() -> fuelTypeManager.update(fuelTypeRequestToUpdate));
    }

    @Test
    void getAllFuelTypesShouldReturnListOfGetAllFuelTypeResponse(){
        List<FuelType> fuelTypes = new ArrayList<>();
        Mockito.when(fuelTypeRepository.findAll()).thenReturn(fuelTypes);

        List<GetAllFuelTypeResponse> responses = fuelTypeManager.getAll();

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
    }

    @Test
    void getFuelTypeByIdShouldReturnValidResponse(){
        int existingFuelTypeId = 1;
        FuelType fuelType = new FuelType();
        fuelType.setId(existingFuelTypeId);
        fuelType.setFuel_name("Gasoline");

        Mockito.when(fuelTypeRepository.findById(existingFuelTypeId)).thenReturn(Optional.of(fuelType));

        GetFuelTypeByIdResponse response = fuelTypeManager.getById(existingFuelTypeId);

        assertNotNull(response);
        assertEquals(existingFuelTypeId, response.getId());
        assertEquals("Gasoline", response.getFuel_name());
    }
}