package nl.han.se.ans.logging;

import nl.han.se.ans.openquestions.RestResponseEntityExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AnsLogger {
    Logger logger = LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);

    public void error(Throwable throwable) {
        logger.error(throwable.getMessage(), throwable);
    }
}
