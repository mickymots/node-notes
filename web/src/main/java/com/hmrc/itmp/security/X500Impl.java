package com.hmrc.itmp.security;

import java.util.ArrayList;
import java.util.Vector;
import java.util.List;

import org.apache.log4j.Logger;

import com.hmrc.itmp.beans.UserDetails;

import uk.gov.inrev.realms.internal.util.*;
import ir.middleware.DirectoryServices.SunONE.*;


/**
 * X500 implementation class uses the Middleware JAR to call X500 and pull the
 * user roles
 * 
 * @author Application Architecture
 *
 */
public class X500Impl implements UserDirectoryInterface {
	static final Logger logger = Logger.getLogger(X500Impl.class);

	/**
	 * Method used to call X500 for a particular user. A UserDetailsCDO is populated
	 * using information pulled from X500.
	 * 
	 * @param userID
	 *            the user ID
	 * @return UserDetailsCDO a populated UserDetailsCDO
	 */
	public UserDetails getUserDetails(String userID) {

		//X500Server inst = X500Server.getInstance();
		//IREmployee det = inst.getUserDetails(userID);
		
		SunDirectoryDAO directory = new SunDirectoryDAO();
		IREmployee det = directory.getUserDetails(userID);

		if (det == null) {
			logger.error("Error in getUserDetails");
			StringBuilder sb = new StringBuilder();
			sb.append("This user ID does not exist in SunONE: ");
			sb.append(userID);
			logger.error(sb.toString());
		} else {
			logger.debug("User returned from SunONE: " + det.toString());
		}

		// Gets the user roles, if nothing exists, exception is thrown
		Vector officeRoles = (Vector)directory.getUserRoles(userID);
	
	   	if (officeRoles == null) {
			logger.error("Error in getUserDetails ::  userRoles is null");
			StringBuilder sb = new StringBuilder();
			sb.append("No roles exist for user: ");
			sb.append(userID);
			logger.error(sb.toString());
		} else if (officeRoles.size() == 0) {
			logger.error("Error in getUserDetails :: userRoles size is 0");
			StringBuilder sb = new StringBuilder();
			sb.append("No roles exist for user: ");
			sb.append(userID);
			logger.error(sb.toString());
		}

		ArrayList<String> userRoles  = new ArrayList<String>();

		// assigns the role names to an ArrayList
		for (int i = 0; i < officeRoles.size(); i++) {
			String role = (String) officeRoles.get(i);
			userRoles.add(role);
		}

		
		logger.debug(userRoles.toString());

		UserDetails user = new UserDetails();
		user.setUserID(det.getPID());
		user.setUserDisplayName(det.getSurname());

		IROrgUnit orgUnit = det.getHomeOU();
		user.setOrganisationUnit(orgUnit.getName());
		user.setOrganisationUnitID(orgUnit.getOUID());
		user.setDepartmentName(orgUnit.getDN());

		user.setUserRoles(userRoles);

		return user;
	}

}
