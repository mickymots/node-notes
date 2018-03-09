package com.hmrc.itmp.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmrc.itmp.beans.ReferenceData;

@Service
public class ReferenceDataService {
	static final Logger debugLog =  Logger.getLogger(ReferenceDataService.class);

	@Autowired
	ReferenceDataLoaderService referenceDataLoaderService;

	@Autowired
	ConfigService configService;

	List<ReferenceData> refdata;

	public void init() {
		debugLog.debug("----- init() called During Application Startup--------- ");
		this.refdata = referenceDataLoaderService.loadRefData();
	}

	public List<ReferenceData> getRefData() {
		debugLog.info("------ Returning Reference Data with Complete File content ------ ");
		return this.refdata;
	}

	public List<ReferenceData> getRefData(String param) {
		debugLog.info("------ Returning Reference Data with Given Content Type  ------"+ param );
		List<ReferenceData> selectedRefData = new ArrayList<ReferenceData>();
		
		for (ReferenceData refData : this.refdata) {
			if (refData.getType().equalsIgnoreCase(param))
				selectedRefData.add(refData);
		}

		return this.filterInactiveRefData(selectedRefData);
	}

	/**
	 * This method filters inactive reference data from the returned reference data records
	 * @param refData
	 * @return
	 */
	private List<ReferenceData> filterInactiveRefData(List<ReferenceData> refData) {
		debugLog.debug("-- START filterInactiveRefData on RefData length = " + refData.size() +" ---");
		
		DateFormat currentDateDF = new SimpleDateFormat("ddMMyyyy");
		DateFormat refDataDF = new SimpleDateFormat("dd/MM/yyyy");

		List<ReferenceData> filteredRefData = new ArrayList<ReferenceData>();
		
		try{
			String dateOverride = this.configService.getConfigProperty("systemDate");
			Date currentDate =  dateOverride != null && !dateOverride.isEmpty() ? (currentDateDF.parse(dateOverride)) : new Date();
			Date today = currentDateDF.parse(currentDateDF.format(currentDate));
		   
			for (ReferenceData record : refData) {
				Date startDate = refDataDF.parse(record.getStart_Date());
				Date endDate = refDataDF.parse(record.getEnd_Date());
				
				if (today.compareTo(startDate) >= 0 && today.compareTo(endDate) <= 0) {
					filteredRefData.add(record);
				}else{
					debugLog.debug("Reference data Record Not Added to response = " + record);
				}
			}
		} catch (Exception e) {
			debugLog.error("Error in date parse " + e.getMessage());
		}
		
		debugLog.debug("-- END filterInactiveRefData --");
		return filteredRefData;
	}
}
