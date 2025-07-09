package nl.han.se.ans.openquestions;

import nl.han.se.ans.logging.AnsLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    AnsLogger logger;

    @ExceptionHandler(value = {Exception.class})
    protected ResponseEntity<Object> handleException(
            RuntimeException ex, WebRequest request) {
        logger.error(ex);
        return handleExceptionInternal(ex, "ANSIE could not perform the requested method: " + ex.getMessage(),
                new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
