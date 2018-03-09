package com.hmrc.itmp.beans;

import java.util.ArrayList;

public class UserDetails {
	
	public String userID;
	public String userDisplayName;
	public String hostname;
	public String departmentName;
	public String locationAddress;
	public String OrganisationUnit;
	public String organisationUnitID;
	public String optimisedRole;
	public ArrayList<String> userRoles = new ArrayList<String>();
	public ArrayList<String> userSBARoles = new ArrayList<String>();
	public ArrayList<String> userModules = new ArrayList<String>();
	public ArrayList<String> userWindows = new ArrayList<String>(); 
	public ArrayList<UserResources> userResources = new ArrayList<UserResources>(); 
	public ArrayList<String> userDDASetting = new ArrayList<String>(); 
	
	/* Getters and Setters */
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserDisplayName() {
		return userDisplayName;
	}
	public void setUserDisplayName(String userDisplayName) {
		this.userDisplayName = userDisplayName;
	}
	public String getHostname() {
		return hostname;
	}
	public void setHostname(String hostname) {
		this.hostname = hostname;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getLocationAddress() {
		return locationAddress;
	}
	public void setLocationAddress(String locationAddress) {
		this.locationAddress = locationAddress;
	}
	
	public String getOrganisationUnit() {
		return OrganisationUnit;
	}
	public void setOrganisationUnit(String organisationUnit) {
		OrganisationUnit = organisationUnit;
	}
	
	public String getOrganisationUnitID() {
		return organisationUnitID;
	}
	public void setOrganisationUnitID(String organisationUnitID) {
		this.organisationUnitID = organisationUnitID;
	}
	public String getOptimisedRole() {
		return optimisedRole;
	}
	public void setOptimisedRole(String optimisedRole) {
		this.optimisedRole = optimisedRole;
	}
	public ArrayList<String> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(ArrayList<String> userRoles) {
		this.userRoles = userRoles;
	}
	public ArrayList<String> getUserSBARoles() {
		return userSBARoles;
	}
	public void setUserSBARoles(ArrayList<String> userSBARoles) {
		this.userSBARoles = userSBARoles;
	}
	public void getUserModules(ArrayList<String> userModules) {
		this.userModules = userModules;
	}
	public void setUserModules(ArrayList<String> userModules) {
		this.userModules = userModules;
	}	
	public ArrayList<UserResources> getUserResources() {
		return userResources;
	}
	public void setUserResources(ArrayList<UserResources> userResources) {
		this.userResources = userResources;
	}
	public ArrayList<String> getUserWindows() {
		return userWindows;
	}
	public void setUserWindows(ArrayList<String> userWindows) {
		this.userWindows = userWindows;
	}
	public ArrayList<String> getUserDDASetting() {
		return userDDASetting;
	}
	public void setUserDDASetting(ArrayList<String> userDDASetting) {
		this.userDDASetting = userDDASetting;
	}
}