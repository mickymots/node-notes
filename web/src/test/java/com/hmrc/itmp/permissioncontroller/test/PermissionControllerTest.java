package com.hmrc.itmp.permissioncontroller.test;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.google.gson.Gson;
import com.hmrc.itmp.beans.ResourceData;
import com.hmrc.itmp.beans.UserDetails;
import com.hmrc.itmp.beans.UserResources;
import com.hmrc.itmp.controller.PermissionController;
import com.hmrc.itmp.filter.SimpleCORSFilter;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PermissionAppConfig.class })
public class PermissionControllerTest {

	static final Logger log = Logger.getLogger("debugLog");

	private MockMvc mockMvc;

	JSONObject userDet;

	@Autowired
	private UserDetails userDetails;

	@Autowired
	private PermissionController permissionController;

	UserResources ccvComponent = new UserResources();
	UserResources RelSummaryComponent = new UserResources();
	UserResources AddressComponent = new UserResources();
	UserResources SummaryComponent = new UserResources();

	ResourceData ccvData = new ResourceData();
	ResourceData relSummaryData = new ResourceData();
	ResourceData addressData = new ResourceData();
	ResourceData summaryComponentData = new ResourceData();

	String userDetailsJSON;

	@SuppressWarnings("unchecked")
	@Before
	public void init() {

		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(permissionController)
				.addFilters(new SimpleCORSFilter()).build();

		ArrayList<String> userRoles = new ArrayList<String>();
		ArrayList<String> userSBARoles = new ArrayList<String>();
		ArrayList<String> userModules = new ArrayList<String>();
		ArrayList<String> userWindows = new ArrayList<String>();
		ArrayList<UserResources> UserRes = new ArrayList<UserResources>();
		ArrayList<String> ccvActions = new ArrayList<String>();
		ArrayList<String> relSummaryActions = new ArrayList<String>();
		ArrayList<String> addressActions = new ArrayList<String>();
		ArrayList<String> sumComponentActions = new ArrayList<String>();
		ArrayList<String> userDDASetting = new ArrayList<String>();

		userRoles.add("ITMP TFC View");

		userModules.add("Consolidated Customer View");
		userModules.add("Individual Summary");

		ccvData.setTitle("Consolidated Customer View");
		ccvData.setHidden("");
		ccvActions.add("edit");
		ccvActions.add("save");
		ccvActions.add("cancel");
		ccvData.setActions(ccvActions);
		ccvComponent.setComponent("ConsolidatedCustomerViewComponent");
		ccvComponent.setData(ccvData);
		ccvComponent.setPath("ccv-home");
		ccvComponent.setModuleName("Consolidated Customer View");

		relSummaryData.setTitle("Relationships Summary");
		relSummaryData.setHidden("");
		relSummaryActions.add("view");
		relSummaryData.setActions(relSummaryActions);
		RelSummaryComponent.setComponent("RelationshipsSummaryComponent");
		RelSummaryComponent.setData(relSummaryData);
		RelSummaryComponent.setPath("relationships-summary");
		RelSummaryComponent.setModuleName("Individual Summary");

		addressData.setTitle("Address");
		addressData.setHidden("");
		addressActions.add("view");
		addressData.setActions(addressActions);
		AddressComponent.setComponent("AddressComponent");
		AddressComponent.setData(addressData);
		AddressComponent.setPath(":NINO/address");
		AddressComponent.setModuleName("Individual Summary");

		summaryComponentData.setTitle("Summary");
		summaryComponentData.setHidden("");
		sumComponentActions.add("view");
		summaryComponentData.setActions(sumComponentActions);
		SummaryComponent.setComponent("SummaryComponent");
		SummaryComponent.setData(summaryComponentData);
		SummaryComponent.setPath(":NINO/summary");
		SummaryComponent.setModuleName("Individual Summary");

		UserRes.add(ccvComponent);
		UserRes.add(RelSummaryComponent);
		UserRes.add(AddressComponent);
		UserRes.add(SummaryComponent);

		userDet = new JSONObject();
		userDet.put("userID", "2200600");
		userDet.put("userDisplayName", "ITMP TFC View");
		userDet.put("departmentName", "ML00001");
		userDet.put("organisationUnitID", "9256");
		userDet.put("userRoles", userRoles);
		userDetailsJSON = new Gson().toJson(userDet);
		log.debug("\n --- INIT() userDetailsJSON -- " + userDetailsJSON);
	}

	// This method test for the status should be ok (200)
	@Test
	public void getPermissionsTest() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(permissionController)
				.addFilters(new SimpleCORSFilter()).build();

		mockMvc.perform(
				get("/services/permissions?userID=2201500")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Content-Type", "application/json")).andExpect(
				status().isOk());

	}

	// This method test for any random content in the response string for
	// different UserID
	@Test
	public void getPermissionsTestData() throws Exception {

		mockMvc.perform(
				get("/services/permissions?userID=2201500")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Content-Type", "application/json"))
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(
						content()
								.string(containsString("\"TFC Processing Officer\"")));
	}

	// This method test multiple user roles returned
	@Test
	public void getPermissionsTestDataJsonMultipleRoles() throws Exception {

		mockMvc.perform(
				get("/services/permissions?userID=AB00009")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Content-Type", "application/json"))
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json("{'userID':'AB00009'}"));
	}

	// This method test response content with test JSON String
	@Test
	public void getPermissionsTestDataJson() throws Exception {

		mockMvc.perform(
				get("/services/permissions?userID=2200600")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.header("Content-Type", "application/json"))
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(userDetailsJSON));
	}

	// Pass invalid userID then userDetails should be null TODO: Need to handle
	// NullPointerException in Controller Code
	// @Test
	// public void getPermissionsInvalidTestData() throws Exception {
	//
	// mockMvc.perform(
	// get("/services/permissions?userID=2201510")
	// .accept(MediaType.APPLICATION_JSON)
	// .contentType(MediaType.APPLICATION_JSON)
	// .header("Content-Type", "application/json")).andExpect(
	// status().isBadRequest());
	// }

	// Add 1 more test case with multiple roles: AB00009

	// Test the data returned in get request if it matches with the test data.

}
