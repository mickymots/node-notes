package com.hmrc.itmp.security;

import com.hmrc.itmp.beans.UserDetails;

/**
 * Interface for the User Directory to retrieve user details
 * from a User Directory
 * 
 */
public interface UserDirectoryInterface {
	
	/** 
	 * @param userID
	 * @return
	 * @throws TechnicalException
	 */

	public UserDetails getUserDetails (String userID);

}
