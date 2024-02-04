package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Model;
import com.tobeto.pair5.repositories.ModelRepository;
import com.tobeto.pair5.services.abstracts.BrandService;
import com.tobeto.pair5.services.abstracts.ModelService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.brand.responses.GetAllBrandResponse;
import com.tobeto.pair5.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.DeleteModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair5.services.dtos.model.responses.GetAllModelResponse;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class ModelManager implements ModelService {
    private ModelMapperService modelMapperService;
    private ModelRepository modelRepository;
    private BrandService brandService;


    @Override
    public void add(AddModelRequest request) {
        checkIsBrandExists(request.getBrandId());
        Model model = this.modelMapperService.forRequest().map(request, Model.class);
        modelRepository.save(model);
    }


    @Override
    public void delete(int id) {
        Model modelToDelete = modelRepository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.modelNotExist));
        modelRepository.delete(modelToDelete);
    }

    @Override
    public void update(UpdateModelRequest request) {
        Model modelToUpdate = modelRepository.findById(request.getId())
                .orElseThrow(()-> new BusinessException(Messages.modelNotExist));
        checkIfBrandNotExists(request.getBrandId());

        this.modelMapperService.forRequest().map(request, modelToUpdate);

        modelRepository.saveAndFlush(modelToUpdate);
    }

    @Override
    public List<GetAllModelResponse> getAll() {
        List<Model> models = modelRepository.findAll();
        return models.stream()
                .map(model -> this.modelMapperService.forResponse().map(model,GetAllModelResponse.class))
                .toList();
    }

    @Override
    public GetAllModelResponse getById(int id) {
        Model model = modelRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.modelNotExist));
        GetAllModelResponse response = this.modelMapperService.forResponse().map(model, GetAllModelResponse.class);
        return response;
    }

    private boolean checkIfBrandNotExists(int id){
        GetAllBrandResponse brand = brandService.getById(id);
        return  true;
    }

    private void checkIsBrandExists(int id){
        try {
            GetAllBrandResponse brand = brandService.getById(id);
        }catch (NoSuchElementException ex){
            throw new BusinessException(Messages.brandAlreadyExits);
        }
    }
}
