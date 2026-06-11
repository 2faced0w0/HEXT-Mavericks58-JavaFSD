package com.cms.config;

import com.cms.exception.FileInvalidExtensionException;
import com.cms.exception.FileNotFoundException;
import com.cms.exception.ResourceNotFoundException;
import com.cms.exception.UserAlreadyPresentException;
import com.cms.utility.ResponseUtility;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {

//    static{
//        System.out.println("i m in global exception handler!!");
//    }
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private ResponseUtility responseUtility;

    //handler method
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleResourceNotFoundException(
            ResourceNotFoundException e
    ){
        logger.error("Error in fetching user details {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e , Principal principal
    ){
        logger.warn("Validation failed for user {} ", principal.getName() );
        BindingResult bindingResult =  e.getBindingResult();
        List<FieldError> errors =  bindingResult.getFieldErrors();
        Map<String, String> map = new HashMap<>();
        for (FieldError error : errors) {
            map.put(error.getField(), error.getDefaultMessage());
            logger.error("Field {} - message: {}", error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity
                .badRequest()
                .body(map);
    }

    // FileNotFoundException
    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleFileNotFoundException(
            FileNotFoundException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    // IOException
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ResponseUtility> handleIOException(
            IOException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    //FileInvalidExtensionException
    @ExceptionHandler(FileInvalidExtensionException.class)
    public ResponseEntity<ResponseUtility> handleFileInvalidExtensionException(
            FileInvalidExtensionException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    //UserAlreadyPresentException
    @ExceptionHandler(UserAlreadyPresentException.class)
    public ResponseEntity<ResponseUtility> handleUserAlreadyPresentException(
            UserAlreadyPresentException e
    ){
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }
}