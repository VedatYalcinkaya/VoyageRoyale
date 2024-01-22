package com.tobeto.pair5.core.utilities.exceptions.problemDetails;

import lombok.Data;

import java.util.Map;

@Data
public class ValidatonProblemDetails extends ProblemDetails{
    public ValidatonProblemDetails  (){
        setTitle("Validation Rule Violation");
        setDetail("Validation Problem");
        setType("http://voyajroyale.com/exceptions/validation");
        setStatus("400");
    }

    private Map<String,String> errors;
}
