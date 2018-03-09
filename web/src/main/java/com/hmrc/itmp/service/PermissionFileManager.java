package com.hmrc.itmp.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Scanner;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;

@Service
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class PermissionFileManager {

	static final Logger log = Logger.getLogger(PermissionFileManager.class);

	private Hashtable<String, PermissionClass> classHashTable;
	private boolean loaded;

	@Autowired
	ConfigService configService;
	
	@PostConstruct
	public void init() {
		log.debug(" ----- init() called During Application Startup ----- ");
		this.loaded = loadPermissionsFile(); 
		if (this.loaded)
		log.debug(" ----- PermissionsFile was loaded on Application Startup ----- ");		
	}

	/**
	 * Reads in the permission data file and splits it into objects which are
	 * stored into a hashtable with the classname as the key. Each class then
	 * adds each of its rows as objects in an ArrayList by tokenising with the
	 * "|" delimiter.
	 * 
	 * @return returns a true if loaded successfully, a false otherwise
	 */
	public boolean loadPermissionsFile() {
		// Initialise
		String line;
		String currentClassName = new String();
		PermissionClass currentClass = null;
		classHashTable = new Hashtable<String, PermissionClass>();
		boolean success = false;

		try {

			// Fetching Permissions File Path mentioned in Environment File
			String filePath = configService.getConfigProperty("PERMISSIONFILEPATH");

			log.debug("--- FILE Path:-----" + filePath);
			File _file = new File(filePath);

			BufferedReader in = new BufferedReader(new FileReader(_file));

			// Loop through rows
			while ((line = in.readLine()) != null) {

				// If the file contains no '|' then don't process - its probably incorrect.
				if (line.indexOf('|') != -1) {
					// Split the line using the | delimiter
					Scanner scan = new Scanner(line);
					scan.useDelimiter("\\|");

					ArrayList<String> data = new ArrayList<String>();

					while (scan.hasNext()) {
						data.add(scan.next());
					}
					scan.close();
					// Trim the class name and code
					data.set(0, data.get(0).trim());
					data.set(1, data.get(1).trim());

					// If the current class name != the row's class name (array
					// element 0)
					// then add a new class to the HashTable
					if (!currentClassName.equals(data.get(0))) {
						// Get class name
						currentClassName = data.get(0);

						// Create new object
						currentClass = new PermissionClass(currentClassName);

						// Add to the Hashtable
						classHashTable.put(currentClassName, currentClass);
					}

					// Create a new row object and add to the current class's
					// collection
					PermissionRow row = new PermissionRow(data);
					currentClass.addRow(row);
				}
			}
			in.close();
			success = true;
			
			log.debug("::::Hashtable <classHashTable>::::"+classHashTable);

		} catch (FileNotFoundException e) {
			log.debug(" ------ File Not Found Exception ------ ");
			e.printStackTrace();
		} catch (Exception e) {
			log.debug(" ------ Exception while Loading Permission File ------ ");
			e.printStackTrace();
		}
		
		return success;
	}

	/**
	 * Retrieves the code and specified decode that are valid now every item in
	 * the class.
	 * 
	 * @param classname
	 *            the class name
	 * @param fieldNum
	 *            the decode field to return. If 0, then ALL decodes are
	 *            returned
	 * @return Hashtable containing the decode field, keyed on code
	 */
	public Hashtable<String, ArrayList<String>> getAllClassItems(
			String classname, int fieldNum) {
		Hashtable<String, ArrayList<String>> decodeHashTable;

		log.debug("::Inside PermissionFileManager.getAllClassItems:: ");
		log.debug("::classname::"+classname+"::fieldNum::"+fieldNum);
				
		try {
			PermissionClass ret = (PermissionClass) classHashTable
					.get(classname);
			decodeHashTable = ret.getAllClassItems(fieldNum);

			log.debug("::::Hashtable <decodeHashTable>::::"+decodeHashTable+" for classname::"+classname);
			return decodeHashTable;
		} catch (Exception e) {
			log.debug("getAllClassItems() returns null.");
			return null;
		}
	}

	/**
	 * This method obtains the object returned from Permission file for the
	 * provided class and code name combination, this method uses the current
	 * data for class validity and returns the first object in the decodes list
	 * 
	 * @param className
	 *            the name of the class to retrieve data from
	 * @param codeName
	 *            the code of the data entry to retrieve
	 * @return returns an ArrayList of the decode fields
	 */
	public ArrayList<String> getClassData(String className, String codeName) {

		log.debug("::Inside PermissionFileManager.getClassData:: ");
		log.debug("::className::"+className+"::codeName::"+codeName);
		
		try {

			ArrayList<String> result = getDecodeField(className, codeName, 0);
			return result;
		} catch (Exception e) {
			log.debug("getRefData() returns null.");
			return null;
		}
	}

	/**
	 * Gets the requested decode field for the given code name that is valid now
	 * 
	 * @param classname
	 *            the class name
	 * @param codename
	 *            the code to return a decode of
	 * @param fieldNum
	 *            the field to decode, or 0 to return all decodes
	 * @return the arraylist of decodes
	 */
	public ArrayList<String> getDecodeField(String classname, String codename,
			int fieldNum) {
		ArrayList<String> field = new ArrayList<String>();
		
		try {
			codename = trimAndPadCode(codename);
			PermissionClass perm = ((PermissionClass) classHashTable
					.get(classname));
			field = perm.getDecodeField(codename, fieldNum);			

			return field;
		} catch (Exception e) {
			log.debug("getDecodeField() returns null.");
			return null;
		}
	}

	/**
	 * Gets the code and trims (removing spaces) and pads it to 8 characters if
	 * needed.
	 * 
	 * @param code
	 *            the code to trim and pad
	 * @return the trimmed and padded code
	 * */
	private String trimAndPadCode(String code) {
		code = code.trim();
		while (code.length() < 8) {
			code = '0' + code;
		}
		return code;
	}
}
