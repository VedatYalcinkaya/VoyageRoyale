package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Color;
import com.tobeto.pair5.repositories.ColorRepository;
import com.tobeto.pair5.services.abstracts.ColorService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.DeleteColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.UpdateColorRequest;
import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ColorManager implements ColorService {
    private ModelMapperService modelMapperService;
    private ColorRepository colorRepository;

    @Override
    public void add(AddColorRequest request) {
        checkIsColorAlreadyExists(request.getName());

        Color color = this.modelMapperService.forRequest().map(request, Color.class);
        colorRepository.save(color);
    }

    @Override
    public void delete(DeleteColorRequest request) {
        Color colorToDelete = colorRepository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.colorNotFound));
        colorRepository.delete(colorToDelete);
    }

    @Override
    public void update(UpdateColorRequest request) {
        Color colorToUpdate = colorRepository.findById(request.getId())
                .orElseThrow(()-> new BusinessException(Messages.colorNotFound));
        checkIsColorAlreadyExists(request.getName());

        this.modelMapperService.forRequest().map(request, colorToUpdate);


        colorRepository.saveAndFlush(colorToUpdate);
    }

    @Override
    public GetAllColorResponse getById(int id) {
        Color color = colorRepository.findById(id).orElseThrow(()-> new BusinessException(Messages.colorNotFound));
        GetAllColorResponse response = this.modelMapperService.forResponse().map(color,GetAllColorResponse.class);
        return response;
    }

    @Override
    public List<GetAllColorResponse> getAll() {
        List<Color> colors = colorRepository.findAll();
        List<GetAllColorResponse> response = colors.stream()
                .map(color -> this.modelMapperService.forResponse().map(color,GetAllColorResponse.class))
                .toList();
        return  response;
    }

    public void checkIsColorAlreadyExists(String color){
        if (colorRepository.existsByNameIgnoreCase(color)){
            throw new BusinessException(Messages.colorExist);
        }
    }


}
