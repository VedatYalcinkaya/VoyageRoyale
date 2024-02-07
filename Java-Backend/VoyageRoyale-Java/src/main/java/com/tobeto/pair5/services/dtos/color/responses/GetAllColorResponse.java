package com.tobeto.pair5.services.dtos.color.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllColorResponse {
    private int id;
    private String name;

    private String code;
}
