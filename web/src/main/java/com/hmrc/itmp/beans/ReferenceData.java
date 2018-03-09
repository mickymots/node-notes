/**
 * 
 */
package com.hmrc.itmp.beans;

/**
 * @author Sumit.Dhall
 *
 */
public class ReferenceData {
	
	private String type;
	private String id;
	private String start_Date;
	private String end_Date;
	private String values;
	
	public ReferenceData(String type, String id, String start_Date, String end_Date, String values) {
		super();
		this.type = type;
		this.id = id;
		this.start_Date = start_Date;
		this.end_Date = end_Date;
		this.values = values;
	}
	
	public ReferenceData() {
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
	public String getStart_Date() {
		return start_Date;
	}
	public void setStart_Date(String start_Date) {
		this.start_Date = start_Date;
	}
	public String getEnd_Date() {
		return end_Date;
	}
	public void setEnd_Date(String end_Date) {
		this.end_Date = end_Date;
	}
	public String getValues() {
		return values;
	}
	public void setValues(String values) {
		this.values = values;
	}

	@Override
	public String toString() {
		return "ReferenceData [type=" + type + ", id=" + id + ", start_Date=" + start_Date + ", end_Date=" + end_Date
				+ ", values=" + values + "]";
	}
}
