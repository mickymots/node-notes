package com.hmrc.itmp.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hmrc.itmp.beans.ReferenceData;
import com.hmrc.itmp.beans.ReferenceDataResult;
import com.hmrc.itmp.service.ReferenceDataService;

@RestController
@RequestMapping(value = "/services")
public class ReferenceDataController {

	static final Logger log = Logger.getLogger(ReferenceDataController.class);

	@Autowired
	ReferenceDataService refDataService;

	@RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/referenceData", consumes = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ReferenceDataResult getRefdata(
			@RequestParam(required = false) String name) {

		log.info(":: Initiating Reference Data Get Call ::");
		if (name != null) {
			log.debug(" :: Get Reference Data Call with Category Type Parameter= " + name);
			List<ReferenceData> refData = new ArrayList<ReferenceData>();

			if(name.indexOf(',') > 0){
				log.debug(":: Multi Reference Data request :: ");
				String[] params = name.split(",");
				
				for(String param : params) {
					refData.addAll(refDataService.getRefData(param));
				}
			}else{
				log.debug(":: Single Reference Data request ::");
				refData = refDataService.getRefData(name);
			}
			
			ReferenceDataResult result = new ReferenceDataResult(refData);
			return result;
		} else {
			log.info(":: Initiating Reference Data Call without any Parameter ::");
			List<ReferenceData> refData = refDataService.getRefData();
			ReferenceDataResult result = new ReferenceDataResult(refData);
			return result;
		}
	}

}
