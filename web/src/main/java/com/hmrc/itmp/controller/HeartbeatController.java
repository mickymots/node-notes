package com.hmrc.itmp.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeartbeatController {

	static final Logger log = Logger.getLogger(HeartbeatController.class);

	@RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/probe")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void respond(){
		log.debug("\n -- Heartbeat Controller returned OK response -- \n" );
	}
}