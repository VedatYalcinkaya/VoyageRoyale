package com.tobeto.pair5.services.dtos.brand.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBrandRequest {

    @NotNull(message = "Name field can not be empty!")
    @Size(min = 2,message = "Brand name must be at least 2 characters!")
    private String name;

}
