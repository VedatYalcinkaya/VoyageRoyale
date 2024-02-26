package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Brand;
import com.tobeto.pair5.repositories.BrandRepository;
import com.tobeto.pair5.services.abstracts.BrandService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.DeleteBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair5.services.dtos.brand.responses.GetAllBrandResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandManager implements BrandService {
    private final BrandRepository brandRepository;
    private ModelMapperService modelMapperService;


    @Override
    public void add(AddBrandRequest request) {
        checkIsBrandAlreadyExists(request.getName());
        Brand brand = this.modelMapperService.forRequest().map(request, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void delete(int id) {
        Brand brandToDelete = brandRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.brandNotFound));
        brandRepository.delete(brandToDelete);
    }

    @Override
    public void update(UpdateBrandRequest request) {
        Brand brandToUpdate = brandRepository.findById(request.getId())
                .orElseThrow(()-> new BusinessException(Messages.brandNotFound));


        this.modelMapperService.forRequest().map(request, brandToUpdate);


        brandRepository.saveAndFlush(brandToUpdate);
    }

    @Override
    public List<GetAllBrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        List<GetAllBrandResponse> responses = brands.stream().map(brand -> this.modelMapperService.forResponse().map(brand,GetAllBrandResponse.class))
                .toList();
        return responses;
    }

    @Override
    public GetAllBrandResponse getById(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.brandNotFound));
        GetAllBrandResponse brandResponse = this.modelMapperService.forResponse().map(brand,GetAllBrandResponse.class);
        return brandResponse;
    }

    public void checkIsBrandAlreadyExists(String brand){
        if (brandRepository.existsByNameIgnoreCase(brand)){
            throw new BusinessException(Messages.brandAlreadyExits);
        }
    }
}
