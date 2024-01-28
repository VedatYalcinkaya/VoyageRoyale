package com.tobeto.pair5.services.concretes;


import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Color;
import com.tobeto.pair5.repositories.ColorRepository;
import com.tobeto.pair5.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.DeleteColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.UpdateColorRequest;
import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
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

class ColorManagerTest {

        private ColorManager colorManager;

    @Mock
    private ColorRepository colorRepository;

    @Mock
    private ModelMapperService modelMapperService;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
        ModelMapper mockedModelMapper = Mockito.mock(ModelMapper.class);
        Mockito.when(modelMapperService.forRequest()).thenReturn(mockedModelMapper);
        Mockito.when(modelMapperService.forResponse()).thenReturn(mockedModelMapper);
        colorManager = new ColorManager(modelMapperService, colorRepository);
    }

    @AfterEach
    void teardown(){

    }

    @Test
    void checkColorAlreadyExistsShouldThrowException(){
        AddColorRequest colorRequest = new AddColorRequest();
        colorRequest.setName("Sky");
        Mockito.when(colorRepository.existsByNameIgnoreCase("Sky"))
                .thenReturn(true);

        assertThrows(BusinessException.class,
                () -> colorManager.add(colorRequest));
    }


    @Test
    void checkColorIdNotExistShouldThrowException(){
        DeleteColorRequest colorToDelete = new DeleteColorRequest();
        colorToDelete.setId(1);
       Mockito.when(colorRepository.findById(colorToDelete.getId())).thenReturn(Optional.empty());

       assertThrows(BusinessException.class,() -> colorManager.delete(colorToDelete));
    }


    @Test
    void successfullySavedData(){
        AddColorRequest colorRequest = new AddColorRequest();
        colorRequest.setName("White");
        Mockito.when(modelMapperService.forRequest().map(colorRequest,Color.class)).thenReturn(new Color("White","#fafafa"));
        colorManager.add(colorRequest);

        assert true;
    }

    @Test
    void successfullyDeletedData(){
        DeleteColorRequest colorRequest = new DeleteColorRequest();
        colorRequest.setId(1);
        Mockito.when(colorRepository.findById(1)).thenReturn(Optional.of(new Color()));
        colorManager.delete(colorRequest);

        assert true;
    }

    @Test
    void checkColorIdNotExistShouldThrowExceptionForUpdateMethod(){
        UpdateColorRequest colorToDelete = new UpdateColorRequest();
        colorToDelete.setId(2);
        Mockito.when(colorRepository.findById(colorToDelete.getId())).thenReturn(Optional.empty());

        assertThrows(BusinessException.class,() -> colorManager.update(colorToDelete));
    }

    @Test
    void checkColorAlreadyExistsShouldThrowExceptionForUpdateMethod(){
        UpdateColorRequest colorRequest = new UpdateColorRequest();
        colorRequest.setName("SkyBlue");
        Mockito.when(colorRepository.findById(colorRequest.getId())).thenReturn(Optional.of(new Color()));
        Mockito.when(colorRepository.existsByNameIgnoreCase(colorRequest.getName()))
                .thenReturn(true);

        assertThrows(BusinessException.class,
                () -> colorManager.update(colorRequest));
    }

    @Test
    void successfullyUpdatedData(){
        UpdateColorRequest colorRequest = new UpdateColorRequest();
        colorRequest.setId(1);
        Mockito.when(colorRepository.findById(1)).thenReturn(Optional.of(new Color()));
        colorManager.update(colorRequest);

        assert true;
    }

    @Test
    void checkColorIdNotExistShouldThrowExceptionForGetByIdMethod(){
        Color color = new Color();
        color.setId(2);
        Mockito.when(colorRepository.findById(color.getId())).thenReturn(Optional.empty());
        Mockito.when(modelMapperService.forResponse().map(color,GetAllColorResponse.class)).thenReturn(new GetAllColorResponse());
        assertThrows(BusinessException.class,() -> colorManager.getById(color.getId()));
    }

    @Test
    void successfullyGetDataById(){
        Color color = new Color();
        Mockito.when(colorRepository.findById(color.getId())).thenReturn(Optional.of(new Color()));
        colorManager.getById(color.getId());

        assert true;
    }

    @Test
    void successfullyGetAllColorsData(){
        List<Color> colors = new ArrayList<>();
        Mockito.when(colorRepository.findAll()).thenReturn(colors);
        colorManager.getAll();
        assert true;
    }

}