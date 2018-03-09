package com.hmrc.itmp.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ApplicationController {

	static final Logger log = Logger.getLogger(ApplicationController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String rootHandler() {
		log.debug(" -- Returning application index page -- ");
		return "index";
	}
}