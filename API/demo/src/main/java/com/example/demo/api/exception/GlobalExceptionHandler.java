package com.example.demo.api.exception;

import com.example.demo.api.dtos.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception exception) {
//        log.error("An error occurred: ", exception);
//        System.out.println("errrrrrrrrrrrrrrrrrrr");
//        System.out.println(exception.getMessage());
//        return buildResponse(ErrorCode.UNCATEGORIZED_EXCEPTION);
//    }

//    @ExceptionHandler(AppException.class)
//    public ResponseEntity<ApiResponse<Object>> handleAppException(AppException exception) {
//        return buildResponse(exception.getErrorCode());
//    }
//
//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<ApiResponse<Object>> handleUserNotFoundException(UserNotFoundException exception) {
//        log.warn("User not found: {}", exception.getMessage());
//        return buildResponse(ErrorCode.USER_NOT_EXISTED);  // Using USER_NOT_EXISTED
//    }
//
//    @ExceptionHandler(InvalidPasswordException.class)
//    public ResponseEntity<ApiResponse<Object>> handleInvalidPasswordException(InvalidPasswordException exception) {
//        log.warn("Invalid password attempt: {}", exception.getMessage());
//        return buildResponse(ErrorCode.INVALID_PASSWORD);
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException(AccessDeniedException exception) {
//        log.warn("Access denied: {}", exception.getMessage());
//        return buildResponse(ErrorCode.UNAUTHORIZED);
//    }
//
//    @ExceptionHandler(value = DataIntegrityViolationException.class)
//    public ResponseEntity<Object> handlerDataIntegrityViolationException(DataIntegrityViolationException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
//    }
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<ApiResponse<Object>> handleValidation(MethodArgumentNotValidException exception) {
//        String enumKey = exception.getFieldError().getDefaultMessage();
//        ErrorCode errorCode = ErrorCode.INVALID_KEY;
//
//        try {
//            errorCode = ErrorCode.valueOf(enumKey);
//        } catch (IllegalArgumentException e) {
//            log.warn("Invalid error code: {}", enumKey);
//        }
//
//        return buildResponse(errorCode);
//    }
//
//    private ResponseEntity<ApiResponse<Object>> buildResponse(ErrorCode errorCode) {
//        return ResponseEntity
//                .status(errorCode.getStatusCode())
//                .body(ApiResponse.<Object>builder()
//                        .code(String.valueOf(errorCode.getCode()))
//                        .message(errorCode.getMessage())
//                        .build());
//    }
// MethodArgumentException : thư viện quăng ra lỗi này nếu invalid argument
//đánh dấu hàm này sẽ chạy mỗi khi chương trình gặp lỗi này
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity handleValidation (MethodArgumentNotValidException exception){
    String msg = "";
    for(FieldError fieldError :exception.getBindingResult().getFieldErrors()){
        //loop qua từng field của dữ liệu , nếu cái nào có lỗi thì thêm vào msg
        msg += fieldError.getDefaultMessage()+"\n";

    }
    return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
}

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleValidation (Exception exception){
        // mỗi khi gặp lỗi này lập tức gọi
        return new ResponseEntity(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }


}
