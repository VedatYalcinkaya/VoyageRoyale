package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Brand;
import com.tobeto.pair5.repositories.BrandRepository;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.brand.requests.AddBrandRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import javax.xml.validation.Validator;


import static org.junit.jupiter.api.Assertions.*;

class BrandManagerTest {
    private BrandManager brandManager;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private ModelMapperService modelMapperService;

    private Validator validator;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ModelMapper mockedModelMapper = Mockito.mock(ModelMapper.class);
        Mockito.when(modelMapperService.forRequest()).thenReturn(mockedModelMapper);
        Mockito.when(modelMapperService.forResponse()).thenReturn(mockedModelMapper);
        brandManager = new BrandManager(brandRepository,modelMapperService);
    }

    @AfterEach
    void tearDown() {

    }

    @Test
        void nameAlreadyExistsShouldThrowException() {

        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("Bmw");

        Mockito.when(modelMapperService.forRequest().map(addBrandRequest, Brand.class)).thenReturn(new Brand());
        Mockito.when(brandRepository.existsByNameIgnoreCase("Bmw")).thenReturn(true); // Simulate existing brand

        BusinessException exception = assertThrows(BusinessException.class, () -> brandManager.add(addBrandRequest));
        assertEquals(exception.getMessage(),Messages.brandAlreadyExits);
    }

    @Test
    void successfullySavedData() {

        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("NewBrand");

        Mockito.when(modelMapperService.forRequest().map(addBrandRequest, Brand.class)).thenReturn(new Brand());

        brandManager.add(addBrandRequest);
        assert true;
    }
}