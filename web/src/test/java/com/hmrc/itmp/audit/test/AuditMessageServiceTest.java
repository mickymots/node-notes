package com.hmrc.itmp.audit.test;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Scanner;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.junit.Before;

import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hmrc.itmp.beans.AuditMessage;
import com.hmrc.itmp.controller.AuditController;
import com.hmrc.itmp.filter.SimpleCORSFilter;
import com.mockrunner.mock.jms.MockQueue;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/JMSContextTest.xml" })
public class AuditMessageServiceTest {

	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private MockQueue mockQueue;

	JSONObject auditMessageJsonObj;
	String auditMessageJSON;
	private MockMvc mockMvc;
	Scanner sc = null;
	AuditMessageListnerTest audList = new AuditMessageListnerTest();
	boolean check = false;
	private AuditMessage auditMessage;
	AuditMessageListnerTest listner = org.mockito.Mockito
			.mock(AuditMessageListnerTest.class);
	Gson gson = new GsonBuilder().create();
	static final Logger log = Logger.getLogger("debugLog");
	 
	
	@Autowired
	private AuditController auditController;

	@SuppressWarnings("unchecked")
	@Before
	public void init() throws Exception {
		ArrayList<String> funcArray = new ArrayList<String>();
		funcArray.add("func1");
		funcArray.add("func2");
		
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(auditController)
				.addFilters(new SimpleCORSFilter()).build();
		auditMessageJsonObj = new JSONObject();
		auditMessageJsonObj.put("revenueActivity",
				"revenueActivity Message Test Data");
		auditMessageJsonObj.put("tpSessionDate",
				"tpSessionDate Message Test Data");
		auditMessageJsonObj.put("orgUnitID", "orgUnitID Message Test Data");
		auditMessageJsonObj.put("revEmpID_PID",
				"revEmpID_PID Message Test Data");
		auditMessageJsonObj.put("terminalID", "terminalID Message Test Data");
		auditMessageJsonObj.put("funcProcresult",
				0);
		auditMessageJsonObj.put("funcEndTime", "1");
		auditMessageJsonObj.put("widerAccessSignal",
				"widerAccessSignal Message Test Data");
		auditMessageJsonObj.put("pseudoTermID",
				"pseudoTermID Message Test Data");
		auditMessageJsonObj.put("machineDate", "1");
		auditMessageJsonObj.put("userRole", "userRole Message Test Data");
		auditMessageJsonObj.put("taxpayerReference",
				"taxpayerReference Message Test Data");
		auditMessageJsonObj.put("sequence", "sequence Message Test Data");
		auditMessageJsonObj.put("functionalParameters",
				(Object)funcArray);
		auditMessageJSON = new Gson().toJson(auditMessageJsonObj);
		AuditMessage auditMessage = gson.fromJson(auditMessageJSON, AuditMessage.class);
		log.debug("\n:::auditMessage::::"+auditMessage);
		when(listner.getAuditMessages()).thenReturn(auditMessage);
	}
	
	@Test
	public void auditMessage() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(auditController).addFilters(new SimpleCORSFilter()).build();
//		auditMessageJSON = new Gson().toJson(auditMessageJsonObj);
		mockMvc.perform(
				post("/services/audit").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON).header("Content-Type", "application/json").header("version", "2.0")
						.content(auditMessageJSON)).andExpect(status().isOk());
	}
	
	 @Test
	 public void getAuditMessagesFromJMS() throws Exception {
		 ArrayList<String> funcArray = new ArrayList<String>();
		 funcArray.add("func1");
		 funcArray.add("func2");
	 mockMvc.perform(post("/services/audit").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
	 .content(auditMessageJSON));
	 this.auditMessage = listner.getAuditMessages();
	 assertTrue(this.auditMessage.getOrgUnitID().equals("orgUnitID Message Test Data"));
	 assertTrue(this.auditMessage.getRevenueActivity().equals("revenueActivity Message Test Data"));
	 assertTrue(this.auditMessage.getTpSessionDate().equals("tpSessionDate Message Test Data"));
	 assertTrue(this.auditMessage.getOrgUnitID().equals("orgUnitID Message Test Data"));
	 assertTrue(this.auditMessage.getRevEmpID_PID().equals("revEmpID_PID Message Test Data"));
	 assertTrue(this.auditMessage.getTerminalID().equals("terminalID Message Test Data"));
	 assertTrue(this.auditMessage.getFuncProcresult()== 0);
	 assertTrue(this.auditMessage.getFuncEndTime().equals("1"));
	 assertTrue(this.auditMessage.getWiderAccessSignal().equals("widerAccessSignal Message Test Data"));
	 assertTrue(this.auditMessage.getPseudoTermID().equals("pseudoTermID Message Test Data"));
	 assertTrue(this.auditMessage.getMachineDate().equals("1"));
	 assertTrue(this.auditMessage.getUserRole().equals("userRole Message Test Data"));
	 assertTrue(this.auditMessage.getTaxpayerReference().equals("taxpayerReference Message Test Data"));
	 assertTrue(this.auditMessage.getSequence().equals("sequence Message Test Data"));
	 assertTrue(this.functionParamValidate(this.auditMessage.getFunctionalParameters()));
	
	 }

	 private boolean functionParamValidate(String[] arr){
		 
		 if(arr[0] != null && arr[1] != null)
			 return arr[0].equalsIgnoreCase("func1") && arr[1].equalsIgnoreCase("func2");
		 else return (arr[0] != null && arr[1] != null);
		 
	 }


}
