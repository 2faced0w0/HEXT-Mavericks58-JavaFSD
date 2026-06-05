package com.HireTrack.config;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.HireTrack.exception.FileInvalidExtensionException;
import com.HireTrack.exception.FileNotFoundException;
import com.HireTrack.exception.ResourceNotFoundException;
import com.HireTrack.utility.ResponseUtility;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {


        private ResponseUtility responseUtility;

        // handler method
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ResponseUtility> handleResourceNotFoundException(
                        ResourceNotFoundException e) {
                responseUtility.setMessage(e.getMessage());
                return ResponseEntity
                                .badRequest()
                                .body(responseUtility);
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(
                        MethodArgumentNotValidException e) {
                BindingResult bindingResult = e.getBindingResult();
                List<FieldError> errors = bindingResult.getFieldErrors();
                Map<String, String> map = new HashMap<>();
                for (FieldError error : errors) {
                        map.put(error.getField(), error.getDefaultMessage());
                }

                return ResponseEntity
                                .badRequest()
                                .body(map);
        }

        // FileNotFoundException
        @ExceptionHandler(FileNotFoundException.class)
        public ResponseEntity<ResponseUtility> handleFileNotFoundException(
                        FileNotFoundException e) {
                responseUtility.setMessage(e.getMessage());
                return ResponseEntity
                                .badRequest()
                                .body(responseUtility);
        }

        // IOException
        @ExceptionHandler(IOException.class)
        public ResponseEntity<ResponseUtility> handleIOException(
                        IOException e) {
                responseUtility.setMessage(e.getMessage());
                return ResponseEntity
                                .badRequest()
                                .body(responseUtility);
        }

        // FileInvalidExtensionException
        @ExceptionHandler(FileInvalidExtensionException.class)
        public ResponseEntity<ResponseUtility> handleFileInvalidExtensionException(
                        FileInvalidExtensionException e) {
                responseUtility.setMessage(e.getMessage());
                return ResponseEntity
                                .badRequest()
                                .body(responseUtility);
        }
}