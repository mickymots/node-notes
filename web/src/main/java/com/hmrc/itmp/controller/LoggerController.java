package com.hmrc.itmp.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hmrc.itmp.beans.LogMessage;
import com.hmrc.itmp.service.ConfigService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value="/services")
public class LoggerController {

	static final Logger debugLog = Logger.getLogger(LoggerController.class);
	static final Logger clientLog = Logger.getLogger("HIBClientLog");
	public static final String VERSION = "version";
	
	@Autowired
	ConfigService configService;

	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST, produces = "application/json", value = "/logger", consumes = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<String> logHIBClient(@RequestBody LogMessage logData,
												 @RequestHeader HttpHeaders httpHeaders, HttpServletRequest req) {

		String pid = req.getUserPrincipal() != null ? req.getUserPrincipal().getName(): "";
		List<String> timestamp = httpHeaders.get("Timestamp");
		List<String> correlationHeader = httpHeaders.get("correlationid");
		String version = configService.getConfigProperty(VERSION);

		debugLog.debug(logData.getMessage());
		debugLog.debug(logData.getLogLevel());

		String logMessage = logData.getMessage();
		String correlationID = "";

		if(correlationHeader != null && correlationHeader.size() >0) {
			correlationID = "correlationID - " + correlationHeader.get(0) + " :: ";
		}

		String loggerData = correlationID + "PID - " + pid  + " :: " + "Timestamp - " + timestamp.get(0) + " :: " + "Version - " + version + " :: "+ logMessage;

		switch (logData.getLogLevel()) {
		case "trace":
			clientLog.trace(loggerData);
			break;

		case "debug":
			clientLog.debug(loggerData);
			break;

		case "info":
			clientLog.info(loggerData);
			break;

		case "warn":
			clientLog.warn(loggerData);
			break;

		case "error":
			clientLog.error(loggerData);
			break;

		case "fatal":
			clientLog.fatal(loggerData);
			break;

		default:
			clientLog.debug(loggerData);

		}
		HttpHeaders headers = new HttpHeaders();
		JSONObject json = new JSONObject();
		json.put("resultMessage", "LoggedSuccessfully");
		
		ResponseEntity<String> entity = new ResponseEntity<String>(json.toJSONString(), headers, HttpStatus.CREATED);
		return entity;

	}

}
