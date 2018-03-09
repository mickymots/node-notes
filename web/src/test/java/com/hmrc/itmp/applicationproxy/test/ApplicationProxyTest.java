package com.hmrc.itmp.applicationproxy.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.google.gson.Gson;
import com.hmrc.itmp.controller.ApplicationProxyController;
import com.hmrc.itmp.filter.SimpleCORSFilter;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ProxyAppConfig.class})
public class ApplicationProxyTest {
	
	static final Logger debugLog = Logger.getLogger("debugLog");
	
	String loggerJson;
	private MockMvc mockMvc;
	
	@Autowired
	private ApplicationProxyController applicationProxyController;
	
	//This will test NPS Proxy Get request is success
	@Test
	public void npsProxyGetTest() throws Exception{
		mockMvc = MockMvcBuilders.standaloneSetup(applicationProxyController).addFilters(new SimpleCORSFilter()).build();
				
		mockMvc.perform(get("/services/npsProxy/da2?endPoint=person/AA000199D/details").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
				.header("gov-uk-originator-id", "HMRC_REST").header("Content-Type", "application/json").header("gov-uk-user-id", "userid"))
				.andExpect(status().isOk());
		
	}
	
	//This will test NPS Proxy Post request is success
	@SuppressWarnings("unchecked")
	@Test
	public void npsProxyPostTest() throws Exception{
		mockMvc = MockMvcBuilders.standaloneSetup(applicationProxyController).addFilters(new SimpleCORSFilter()).build();
		JSONObject jsonString = new JSONObject();
		jsonString.put("line1", "Line 1");
		jsonString.put("line2", "Line 2");
		jsonString.put("line3", "Line 3");
		jsonString.put("postcode", "NE27 0QQ");
		jsonString.put("country", "UK");
		jsonString.put("start_date", "2009-07-08");
		jsonString.put("last_confirmed_date", "2009-11-11");
		
		String jsonFormatString = "";
		jsonFormatString = new Gson().toJson(jsonString);
		debugLog.debug("\n\n\n\n:::::::jsonFormatString:::::::::::"+jsonFormatString);
		mockMvc.perform(post("/services/npsProxy/da2?endPoint=person/AA000199D/address/add").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
				.header("gov-uk-originator-id", "HMRC_REST").header("eTag", "27").header("Content-Type", "application/json").header("gov-uk-user-id", "userid").content(jsonFormatString))
				.andExpect(status().isOk());
		
	}

	        //This will test NPS Proxy PUT request is success
		@SuppressWarnings("unchecked")
		@Test
		public void npsProxyPutTest() throws Exception{
			mockMvc = MockMvcBuilders.standaloneSetup(applicationProxyController).addFilters(new SimpleCORSFilter()).build();
			JSONObject jsonString = new JSONObject();
			jsonString.put("line1", "Line 1");
			jsonString.put("line2", "Line 2");
			jsonString.put("line3", "Line 3");
			jsonString.put("postcode", "NE27 0QQ");
			jsonString.put("country", "UK");
			jsonString.put("start_date", "2009-07-08");
			jsonString.put("last_confirmed_date", "2009-11-11");
			
			String jsonFormatString = "";
			jsonFormatString = new Gson().toJson(jsonString);
			debugLog.debug("\n\n\n\n:::::::jsonFormatString:::::::::::"+jsonFormatString);
			mockMvc.perform(put("/services/npsProxy/da2?endPoint=person/AA000199D/address/add").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
					.header("gov-uk-originator-id", "HMRC_REST").header("eTag", "27").header("Content-Type", "application/json").header("gov-uk-user-id", "userid").content(jsonFormatString))
					.andExpect(status().isOk());
			
		}
		
		
		//This will test NPS Proxy Delete request is success
		@SuppressWarnings("unchecked")
		@Test
		public void npsProxyDeleteTest() throws Exception{
			mockMvc = MockMvcBuilders.standaloneSetup(applicationProxyController).addFilters(new SimpleCORSFilter()).build();
			JSONObject jsonString = new JSONObject();
			jsonString.put("line1", "Line 1");
			jsonString.put("line2", "Line 2");
			jsonString.put("line3", "Line 3");
			jsonString.put("postcode", "NE27 0QQ");
			jsonString.put("country", "UK");
			jsonString.put("start_date", "2009-07-08");
			jsonString.put("last_confirmed_date", "2009-11-11");
			
			String jsonFormatString = "";
			jsonFormatString = new Gson().toJson(jsonString);
			debugLog.debug("\n\n\n\n:::::::jsonFormatString:::::::::::"+jsonFormatString);
			mockMvc.perform(delete("/services/npsProxy/da2?endPoint=person/AA000199D/address/add").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
					.header("gov-uk-originator-id", "HMRC_REST").header("eTag", "27").header("Content-Type", "application/json").header("gov-uk-user-id", "userid").content(jsonFormatString))
					.andExpect(status().isOk());
			
		}
	
}

