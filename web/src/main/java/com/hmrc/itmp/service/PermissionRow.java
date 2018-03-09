package com.hmrc.itmp.service;

import java.util.ArrayList;

/**
*
* Represents one Permission data row which consists of the classname, unique code, and the decodes.
* Provides get methods to return each element.
* One or more rows are contained in PermissionClass.
* 
* @author Application Architecture
*/

public class PermissionRow {

	private String code;	
	private ArrayList<String> fieldList;
	
	public PermissionRow(ArrayList<String> row){
		code = row.get(1);
		
		fieldList = new ArrayList<String>(row.size()-4);
		for(int i=4; i< row.size(); i++)
		{
			fieldList.add(row.get(i));
		}
	}

	public String getCode() {
		return code;
	}

	public ArrayList<String> getFieldList() {
		return fieldList;
	}
	
}
