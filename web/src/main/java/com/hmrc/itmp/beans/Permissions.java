package com.hmrc.itmp.beans;

/**
 * This is the <bean> class for Permissions 
 * @author soumit.mandal
 */
public class Permissions {
	
	private String type;
	private String id;
	private String values;	
	
	/**
	 * Constructor with fields
	 * @param type
	 * @param id
	 * @param values
	 */
	public Permissions(String type, String id, String values) {
		super();
		this.type = type;
		this.id = id;
		this.values = values;
	}
	
	public Permissions() {
		super();	
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getValues() {
		return values;
	}

	public void setValues(String values) {
		this.values = values;
	}	
}
