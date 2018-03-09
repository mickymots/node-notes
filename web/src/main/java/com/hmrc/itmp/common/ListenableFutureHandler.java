package com.hmrc.itmp.common;

import com.hmrc.itmp.controller.ApplicationProxyController;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.context.request.async.DeferredResult;

public class ListenableFutureHandler implements ListenableFutureCallback<ResponseEntity<String>> {
        static final Logger log = Logger.getLogger(ApplicationProxyController.class);

        DeferredResult<ResponseEntity<?>> deferredResult;

        public ListenableFutureHandler(DeferredResult<ResponseEntity<?>> deferredResult){
            this.deferredResult = deferredResult;
        }

        @Override
        public void onFailure(Throwable t) {
            deferredResult.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(t));
        }

        @Override
        public void onSuccess(ResponseEntity result) {
            log.debug("API Call :: RESULT BODY :: " + result.getBody());
            log.debug("API Call :: RESULT STATUS :: " + result.getStatusCode());


            if(result.getStatusCode().is4xxClientError())
                deferredResult.setResult(ResponseEntity.badRequest().body(result.getBody()));
            else
                deferredResult.setResult(ResponseEntity.ok(result.getBody()));
        }
}