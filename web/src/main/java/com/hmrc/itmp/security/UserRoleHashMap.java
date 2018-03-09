package com.hmrc.itmp.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.hmrc.itmp.beans.UserDetails;

public class UserRoleHashMap {

	static final Logger log = Logger.getLogger(UserRoleHashMap.class);
	UserDetails userDetails;

	@Autowired
	SecurityManager securityManager;

	List<String> roles = new ArrayList<String>();
	HashMap<String,UserDetails> userDetailsMap = new HashMap<String, UserDetails>();
	
	public UserDetails getUserDetails(String key) {
		
		log.debug("\n Inside UserRoleHashMap.getUserDetails::::---");
		log.debug("\n userID to lookup::"+key);
		
		UserDetails userDetails = userDetailsMap.get(key);
		
		if (userDetails == null){
			log.debug("\n :: UserDetails does not exist in <HashMap>.Fetching from SecurityManager :: ");
			userDetails = securityManager.getUserDetails(key);
			log.debug("\n -- userDetails returned by SecurityManager -- " + userDetails.toString());
		}
		return userDetails;
	}

	public void putUserRole(String key, UserDetails value) {
		log.debug("\n :: Adding userRoles to hashMap :: ");
		userDetailsMap.put(key,value);
	}

	public void removeUserSession(String key){
		log.debug(" removeUserSession invoked for " + key);

		UserDetails userDetails = userDetailsMap.get(key);
		if(userDetails != null) {
			UserDetails removedUserDetails = userDetailsMap.remove(key);
			log.debug(" Session Removed for " + removedUserDetails.userID);
		}
	}
}
