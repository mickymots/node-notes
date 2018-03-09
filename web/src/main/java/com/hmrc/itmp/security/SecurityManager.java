package com.hmrc.itmp.security;

import java.util.*;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.hmrc.itmp.beans.ResourceData;
import com.hmrc.itmp.beans.UserDetails;
import com.hmrc.itmp.beans.UserResources;
import com.hmrc.itmp.common.Constants;
import com.hmrc.itmp.service.PermissionFileManager;
/**
 * SecurityManager uses the user ID to retrieve its roles from X500 and then
 * uses these roles to calculate what the user role objects are from Permission
 * file.
 * 
 * @author Application Architecture
 */

public class SecurityManager {

	@Autowired
	PermissionFileManager permissionManager;
	
	@Autowired
	UserDirectoryInterface directory;

	static final Logger log = Logger.getLogger(SecurityManager.class);

	/**
	 * This method passes the userID to X500 to retrieve the user's roles. From
	 * the roles it builds up the user's role objects from Permission file. This
	 * object will then be returned to the UserRoleHashMap to be stored in
	 * the <HashMap>
	 * 
	 * @param userID
	 *            the ID of the user
	 * @return a UserDetails object containing information about the user and
	 *         their role objects.
	 */
	//TODO: remove @SuppressWarnings later
	@SuppressWarnings("unused")
	public UserDetails getUserDetails(String userID) {

		UserDetails userDetails;

		log.debug("::Inside SecurityManager.userID from UserRoleHashMap:: " + userID);

		ArrayList<UserResources> resources = new ArrayList<UserResources>();
		ArrayList<String> sbaRoles = new ArrayList<String>();
//		ArrayList<String> ddaSettings = new ArrayList<String>();
		ArrayList<String> modules = new ArrayList<String>();

		userDetails = directory.getUserDetails(userID);
		log.debug(":: userDetails from Directory:: " + userDetails.toString());
		
		ArrayList<String> roles = null;

		if (userDetails != null) {
			roles = userDetails.getUserRoles();
			log.debug(":: roles for the user:: " + roles);
		} else {
			log.error("::userDetails returned empty:: ");
		}

		StringBuilder optimisedRoleSB = new StringBuilder();
		if (roles != null) {

			this.getRolesObjects(roles, resources, optimisedRoleSB, modules, userID);
			this.getSBARoles(roles, sbaRoles);

		} else {
			log.error(":: User roles returned empty:: ");
		}

		userDetails.setUserSBARoles(sbaRoles);
		userDetails.setUserModules(modules);
//		userDetails.setUserWindows(windows);
		userDetails.setUserResources(resources);
//		userDetails.setUserDDASetting(ddaSettings);
		userDetails.setOptimisedRole(optimisedRoleSB.toString());

		return userDetails;
	}

	/**
	 * This method accepts the user Roles retrieved from X500 & empty array for
	 * SBA Roles compares the user roles to the SBA role data in Permission file
	 * (SBAREA__) to determine which are SBA roles
	 * 
	 * @param ArrayList
	 *            <String> roles for the 'userID'
	 * @param ArrayList
	 *            <String> sbaRoles
	 */
	private void getSBARoles(ArrayList<String> roles, ArrayList<String> sbaRoles) {
		// compares the user roles to the SBA ref data to determine which are
		// SBA roles
		// In SBAREA__, the 3rd decode is the role itself
		
		log.debug("::Inside getSBARoles() :: ");
		Hashtable<String, ArrayList<String>> allSBARoles = permissionManager
				.getAllClassItems(Constants.SecurityKeys.SBAROLE, 3);
		
		log.debug("::Hashtable <allSBARoles>::"+allSBARoles);

		// a Set is used to store unique values only
		HashSet<String> set = new HashSet<String>();

		if (allSBARoles != null) {

			Enumeration<ArrayList<String>> elements = allSBARoles.elements();

			while (elements.hasMoreElements()) {
				ArrayList<String> sbaRefDataRole = elements.nextElement();

				if (sbaRefDataRole != null) {
					String sbaRole = sbaRefDataRole.get(0);

					for (String aUserRole : roles) {
						// if they match, it is a valid SBA role and should be
						// added
						if (aUserRole.equalsIgnoreCase(sbaRole)) {
							set.add(aUserRole);
						}
					}
				}
			}
		}
		sbaRoles.addAll(set);
		log.debug("::ArrayList <sbaRoles>::"+sbaRoles);

	}

	private void getRolesObjects(ArrayList<String> roles, ArrayList<UserResources> resources,
			StringBuilder optimisedRoleSB, ArrayList<String> modules, String userID) {
		
		log.debug("::Inside getRolesObjects() :: ");
		
		ResourceData resData;
		UserResources userResources;

		Set<String> objects = new LinkedHashSet<>();
		Hashtable<String, ArrayList<String>> table = permissionManager.getAllClassItems(Constants.SecurityKeys.USERROLE, 0);
		
		log.debug("::Hashtable <table>::"+table);
		if (table != null) {
			ArrayList<String> list;
			Enumeration<String> en = table.keys();
			while (en.hasMoreElements()) {
				list = table.get(en.nextElement());
				for (int rolesCounter = 0; rolesCounter < roles.size(); rolesCounter++) {
					if (list != null
							&& list.get(0).equals(roles.get(rolesCounter))) {
						// Assumes that a role with < 3 items is DDA setting.
						if (list.size() >= 3) {
							optimisedRoleSB.append(list.get(0));
						}
						for (int i = 1; i < list.size(); i++) {
							objects.add(list.get(i));
						}
					}
				}
			}

			log.debug("::HashSet <objects>::"+objects);
			// checks to see if a suitable role has been found
			if (optimisedRoleSB == null
					|| "".equals(optimisedRoleSB.toString())) {
				// TODO: Raise Technical exception
				// TODO: Raise Logger
			}		
			
			String moduleName;			

			ArrayList<String> singleObject = new ArrayList<String>();
//			boolean defaultDDA = true;
			

			for (String key : objects) {

				// Append zeros to the left of the key until it is the correct 8
				// characters long
				int required = 8 - key.length();
				StringBuilder sb = new StringBuilder();
				for (int j = 0; j < required; j++) {
					sb.append("0");
				}
				sb.append(key);
				key = sb.toString();

				singleObject = (ArrayList<String>) permissionManager.getClassData(
						Constants.SecurityKeys.SOBJECTS, key);
				
				log.debug("::singleObject ::"+singleObject);

				if (singleObject != null) {

					//TODO: Enable code when needed
//					if (singleObject.get(0).equals(
//							Constants.SecurityTypes.DDA_SETTING)) {
//						// The number '1' represents the location of the
//						// resource element
//						ddaSettings.add(singleObject.get(1));
//						defaultDDA = false;
//					}

					if (singleObject.get(0).equals(
							Constants.SecurityTypes.MODULES)) {
						StringBuilder sb1 = new StringBuilder();
						// Position '1' represents the name of the Module
						moduleName = singleObject.get(1);

						sb1.append(moduleName);
						modules.add(sb1.toString());
					}

					if (singleObject.get(0).equals(
							Constants.SecurityTypes.PAGE_RESOUR)) {
						
						resData = new ResourceData();
						userResources = new UserResources();
						StringBuilder sb2;
						ArrayList<String> tempArr = new ArrayList<String>();
						
						userResources.setModuleName(singleObject.get(1));
						userResources.setPath(singleObject.get(2));
						userResources.setComponent(singleObject.get(3));
						resData.setTitle(singleObject.get(4));
						resData.setHidden(singleObject.get(5));
						resData.setChild(singleObject.get(6));
												
						for (int j = 7; j < singleObject.size(); j++) {
							sb2 = new StringBuilder();
							sb2.append(singleObject.get(j));
							tempArr.add(sb2.toString());
						}
						
						resData.setActions(tempArr);
						userResources.setData(resData);
																		
						resources.add(userResources);
						log.debug("userResources::"+userResources.toString());
						
					}

				}
			}
		}

	}

}
