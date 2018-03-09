package com.hmrc.itmp.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.io.FileInputStream;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmrc.itmp.beans.ReferenceData;

@Service
public class ReferenceDataLoaderService {

	static final Logger log = Logger.getLogger(ReferenceDataLoaderService.class);

	@Autowired
	ConfigService configService;

	@SuppressWarnings("resource")
	public List<ReferenceData> loadRefData() {
		log.info("\n ::Loading Reference Data File::");

		// Fetching Reference Data File from configSevice
		String filePath = configService.getConfigProperty("FILEPATH");
		log.debug("\n -- File Path used to load Ref Data -- " + filePath);

		List<ReferenceData> refdataList = new ArrayList<ReferenceData>();
		FileInputStream inputStream = null;
		Scanner sc = null;
		try {
			inputStream = new FileInputStream(filePath);
			sc = new Scanner(inputStream, "UTF-8");

			// Reading Content from The Reference Data File
			while (sc.hasNextLine()) {
				String line = sc.nextLine();
				String[] details = line.split("\\|", 5);

				if(details != null && details.length > 4) {
					ReferenceData refdata = new ReferenceData();
					refdata.setType(details[0]);
					refdata.setId(details[1]);
					refdata.setStart_Date(details[2]);
					refdata.setEnd_Date(details[3]);
					refdata.setValues(details[4]);
					refdataList.add(refdata);
				}else{
					log.error("Invalid RefData configuration for =" + line);
				}
			}

			// note that Scanner suppresses exceptions
			if (sc.ioException() != null) {
				throw sc.ioException();
			}

		} catch (FileNotFoundException e) {
			log.error("\n !!!File Not Found Exception!!!" + e);
		} catch (Exception e) {
			log.error("\n\n !!! Exception while Loading Reference Data File!!! \n\n"	+ e);
		}finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				}catch (IOException e) {
					log.error("\n !!!IOException !!!" + e);
				}
			}
			if (sc != null) {
				sc.close();
			}
		}
		return refdataList;
	}
}