package com.hmrc.itmp.controller;

import java.io.FileNotFoundException;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.hmrc.itmp.beans.UserDetails;
import com.hmrc.itmp.security.UserRoleHashMap;
import com.hmrc.itmp.service.ConfigService;

@RestController
@RequestMapping(value = "/services")
public class PermissionController {

	@Autowired
	UserRoleHashMap cachedUsers;

	@Autowired
	ConfigService configService;

	static final Logger log = Logger.getLogger(PermissionController.class);

	@RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/permissions", consumes = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public String getPermissions(HttpServletRequest req, @RequestParam(required = false) String userID)
			throws FileNotFoundException, ParseException {

		log.debug("Invoked PermissionController.getPermissions method:::----");

		UserDetails userDetails = null;
		HttpSession session = req.getSession();
		Gson gson = new Gson();

		// Fetching PROD switch mentioned in Environment File
		Boolean envFlag = Boolean.valueOf(configService.getConfigProperty("PROD"));
		log.debug("---- envFlag = " + envFlag);
		String details = null;

		if (envFlag.booleanValue()) {
			log.debug("---- PROD environment enabled ----");

			if (req.getUserPrincipal() != null) {
				log.debug("--- userID from Principal:::----" + req.getUserPrincipal().getName());
				session.setAttribute("userID",req.getUserPrincipal().getName());
				userDetails = getUserDetails(req.getUserPrincipal().getName());
				log.debug("userDetails for userID:::----" + userDetails);

			}
		} else {
			log.debug("--- DEV environment enabled:::----");
			log.debug("---- userID passed in HTTP request:::----" + userID);

			if (userID != null) {
				session.setAttribute("userID",userID);
				userDetails = getUserDetails(userID);
				log.debug("---- userDetails for userID:::----" + userDetails.toString());
			} else {
				log.error("---userID not passed from browser:::----");
			}
		}

		if (userDetails == null) {
			log.error("userDetails is NULL:::----");
		} else {
			putMapEntry(userID, userDetails);
			log.debug("userDetails saved in <HashMap>");
			details = gson.toJson(userDetails);
			log.debug("userDetails in JSON::" + details);
		}

		return details;
	}

	public UserDetails getUserDetails(String key) {
		log.debug("---- Inside getMapEntry::::---");

		UserDetails _userDtls;
		_userDtls = cachedUsers.getUserDetails(key);

		return _userDtls;
	}

	public void putMapEntry(String key, UserDetails details) {
		cachedUsers.putUserRole(key, details);
	}
}
