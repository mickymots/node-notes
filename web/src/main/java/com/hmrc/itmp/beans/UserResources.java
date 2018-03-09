package com.hmrc.itmp.beans;

public class UserResources {
	
	public String moduleName = null;
	public String path = null;
	public String component = null;
	public ResourceData data = null;
	
	/* Getters and Setters */
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getComponent() {
		return component;
	}
	public void setComponent(String component) {
		this.component = component;
	}
	public ResourceData getData() {
		return data;
	}
	public void setData(ResourceData data) {
		this.data = data;
	}
}
