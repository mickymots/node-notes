package com.hmrc.itmp.service;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.DefaultResponseErrorHandler;

public class CustomErrorHandler extends DefaultResponseErrorHandler {
	static final Logger log = Logger.getLogger(CustomErrorHandler.class);
	
	/**
	 * Override the Default Response error handler so that 400 errors are not handled by the error flow
	 */
	public boolean hasError(HttpStatus statusCode){
		log.debug("hasError method invoked");
		
		if(statusCode.is4xxClientError())
			return false;
		
		else if(statusCode.is2xxSuccessful())
			return false;
		
		else return true;
		
	}
	
}