package com.hmrc.itmp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;

import org.apache.log4j.Logger;

import com.hmrc.itmp.service.PermissionRow;

/**
* Represents one or more Permission objects.
* 
* @author Application Architecture
*/
public class PermissionClass {
	
	static final Logger log = Logger.getLogger(PermissionClass.class);

	private String mClassName;
	private ArrayList<PermissionRow> rowList;
	private HashMap<String,CodeMap> codeMap;
	
	/**
	 * Constructs a new PermissionClass object from a String that 
	 * is fed in.
	 *
	 * @param  className the PermissionClass classname
	 */
	public PermissionClass(String className){
		mClassName = className;
		rowList = new ArrayList<PermissionRow>();
		codeMap = new HashMap<String,CodeMap>();	
	}
	
	/** Get the number items in this class
	* @return the number of class items
	*/
	public int getNumClassItems(){
		return rowList.size();
	}
		
	/** Get the classname of the class
	 * @return the classname String
	 */
	public String getClassName(){
		return mClassName;
	}
	
	/**Retrieves the code and specified decode that are valid on the specified date for every item in the class.
	 * @param fieldNum the decode field index. If it is 0, it returns ALL the decode fields.
	 * @return a hashtable is returned containing the codes as keys and their respective decode value(s) in an ArrayList
	 */
	public Hashtable<String,ArrayList<String>> getAllClassItems(int fieldNum)
	{			
		PermissionRow row;
		ArrayList<String> field;

		Hashtable<String,ArrayList<String>> decodeHashtable = new Hashtable<String,ArrayList<String>>();
	
		// Loop through each row in the class
		for (int i = 0; i < rowList.size(); i++)
		{ 
			// Get the row from the list
			row = (PermissionRow) rowList.get(i);
			
			field = new ArrayList<String>();
			
			// Check to ensure that the requested field is valid
			if (fieldNum < 0 || fieldNum > row.getFieldList().size())
			{
				return null;
			}

			// If fieldNum is 0 then add the list of decodes
			if (fieldNum == 0)
			{
				field = row.getFieldList();
			}
				// Otherwise add the requested decode
			else
			{
				field.add((String) row.getFieldList().get(fieldNum - 1));
			}

			// Add to the hastable the code and requested field
			decodeHashtable.put(row.getCode(),field);
		}

		// Returns the updated hashtable
		return decodeHashtable;
	}
	
	/**
	 * Retrieves a decode for each row that matches specified code that are valid now
	 * @param code the code to match
	 * @param fieldNum the decode field to return. If fieldNum is 0 the list will contain another list for each row matched. 
	 * The inner list is a list of strings for the individual decodes.  
	 * If fieldNum is not 0 then the list is a list of strings for the requested decode field.
	 * @return the decodeList is returned 
	 */
	public ArrayList<ArrayList<String>> getAllClassItemsForCode(String code, int fieldNum)
	{
		return _getAllClassItemsForCode( code, fieldNum);
	}
	
	/**
	 * Retrieves a decode for each row that matches specified code that are valid on the specified date.
     * @param code the code to match
	 * @param fieldNum the decode field to return. If fieldNum is 0 the list will contain another list for each row matched. 
	 * The inner list is a list of strings for the individual decodes.  
	 * If fieldNum is not 0 then the list is a list of strings for the requested decode field.
	 * @return the decodeList is returned 
	 */
	private ArrayList<ArrayList<String>> _getAllClassItemsForCode(String code, int fieldNum)
	{
			ArrayList<String> field;

			ArrayList<ArrayList<String>> decodeList=new ArrayList<ArrayList<String>>();
			CodeMap cm=codeMap.get(code);
			if(cm==null) return null;

			for(Integer i : cm.ids)
			{
				field = new ArrayList<String>();
				PermissionRow row=rowList.get(i.intValue());
				
				if(fieldNum == 0)
				{
					field = row.getFieldList();
				}
				else
				{
					field.add(row.getFieldList().get(fieldNum - 1));
				}
			}
			return decodeList;
		}
	/**
	 * Gets the requested decode field for the given code name that is valid now.
	 * @param code the code to return a decode of
	 * @param fieldNum the field to decode, or 0 to return all decodes
	 * @return the returned decode(s) in an ArrayList
	 */
	public ArrayList<String> getDecodeField(String code, int fieldNum)
	{
		ArrayList<String>field = new ArrayList<String>();

		for (int i =0; i<rowList.size(); i++){
			
			PermissionRow row=rowList.get(i);
			if (code.equals(row.getCode())){
				if( (fieldNum > row.getFieldList().size()) )
				{
					return null;
				}

				if(fieldNum == 0)
				{
					field = row.getFieldList();
				}
				else
				{
					field.add(row.getFieldList().get(fieldNum - 1));
				}
				return field;
			}				
		}
		return null;
	}
	
	/**
	 * Adds a new row to the class
	 * 
	 * @param row
	 *            the row to add
	 * @return true if it is successfully added
	 */
	public boolean addRow(PermissionRow row) {

		int pos = row.getFieldList().size();
		rowList.add(row);

		String code = row.getCode();
		CodeMap cm = codeMap.get(code);
		if (cm == null) {
			cm = new CodeMap();
			codeMap.put(code, cm);
		}
		cm.ids.add(new Integer(pos));

		return true;
	}
}

class CodeMap
{
	ArrayList<Integer> ids=new ArrayList<Integer>();
}