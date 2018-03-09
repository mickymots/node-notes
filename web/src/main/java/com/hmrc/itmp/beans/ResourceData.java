package com.hmrc.itmp.beans;

import java.util.ArrayList;

public class ResourceData {

	public String title = null;
	public String hidden = null;
	public String child = null;
	public ArrayList<String> actions = new ArrayList<String>();
	
	/* Getters and Setters */
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getHidden() {
		return hidden;
	}
	public void setHidden(String hidden) {
		this.hidden = hidden;
	}
	public ArrayList<String> getActions() {
		return actions;
	}
	public void setActions(ArrayList<String> actions) {
		this.actions = actions;
	}	

	public String getChild(){
		return child;
	}

	public void setChild(String child){
		this.child = child;
	}
}
