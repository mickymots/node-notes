package com.hmrc.itmp.refdata.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import com.hmrc.itmp.service.ReferenceDataLoaderService;
import com.hmrc.itmp.service.ReferenceDataService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hmrc.itmp.beans.ReferenceData;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class})
public class ReferenceDataTest {

	static final Logger log = Logger.getLogger("debugLog");
	
	@Autowired
	private ReferenceDataLoaderService referenceDataLoaderService;

	@Autowired
	private ReferenceDataService refDataService;

	// This test case is testing Data Reference file which loads during server
	// startup and ensure loaded file has content or not
	@Test
	public void testReferenceDataService() {

		int fileSize = referenceDataLoaderService.loadRefData().size();
		log.info("\n ::Loading Reference Data fileSize::" +fileSize);
		assertEquals(3, fileSize);
	}

	// This test case is testing for Parameter search and returns non empty file
	// with correct Category type passed
	@Test
	public void testReferenceDataCacheListCorrectData() {

		List<ReferenceData> list = refDataService.getRefData("ALCANRES");
		assertFalse(list.isEmpty());
	}

	// This test case is testing for Parameter search and returns non empty file
	// with Invalid Category type passed
	@Test
	public void testReferenceDataCacheListInCorrectData() {

		List<ReferenceData> list = refDataService.getRefData("INVALIDDATA");
		assertTrue(list.isEmpty());
	}

	// This test case check the Reference Data returned after
	// parameter search is correct as expected, testing using valid category
	// type "ALCANRES" (MultiValues in test file)
	@Test
	public void testReferenceDataListWithCorrectParameter_OnlyOccurence() {

		List<ReferenceData> list = refDataService.getRefData("ALCANRES");
		boolean listResult = compareList(list);
		assertTrue(listResult);
	}

	// This test case check the Reference Data returned after
	// parameter search is correct as expected, testing using valid category
	// type
	// "ADD_TYPB"
	@Test
	public void testReferenceDataListWithCorrectParameter_MultiOccurence() {

		List<ReferenceData> list = refDataService.getRefData("ADD_TYPB");
		boolean listResult = compareListMultiValues(list);
		assertTrue(listResult);
	}

	// This test case check the Reference Data returned after
	// parameter search is correct as expected, testing using invalid type
	@Test
	public void testReferenceDataListWithInCorrectParameter() {

		List<ReferenceData> list = refDataService.getRefData("INVALID");
		boolean listResult = compareList(list);
		assertFalse(listResult);
	}

	// This test case is testing if Category Type "INVALIDDATA" is present in
	// loaded file or not, Test File originally DOES NOT has this Type
	@Test
	public void testReferenceDataCacheEmptyList() {

		List<ReferenceData> list = refDataService.getRefData("INVALIDDATA");
		assertTrue(list.isEmpty());
	}

	// This test case tests Reference Data File in Cache should has some data
	// i.e file is not suppose to be empty
	@Test
	public void testReferenceDataCacheFile() {

		List<ReferenceData> list = refDataService.getRefData();
		assertEquals(false, list.isEmpty());
	}

	// Method to compare list
	public boolean compareList(List<ReferenceData> list) {

		// creating test ReferenceData List
		List<ReferenceData> listTest = new ArrayList<ReferenceData>();
		ReferenceData rf = new ReferenceData();
		rf.setType("ALCANRES");
		rf.setId("00000001");
		rf.setStart_Date("01/01/1900");
		rf.setEnd_Date("01/01/2078");
		rf.setValues("To Be Refunded");
		listTest.add(rf);

		if (list.size() == listTest.size()) {
			for (ReferenceData testList : listTest) {
				for (ReferenceData mainList : list) {
					if (testList.getId().equals(mainList.getId())
							&& testList.getStart_Date().equals(mainList.getStart_Date())
							&& testList.getEnd_Date().equals(mainList.getEnd_Date())
							&& testList.getValues().equals(mainList.getValues())) {
						return true;
					}
				}
			}
		}
		return false;
	}

	// Method to compare Multi list
	public boolean compareListMultiValues(List<ReferenceData> list) {

		// creating test ReferenceData List
		List<ReferenceData> listTest = new ArrayList<ReferenceData>();
		ReferenceData rf1 = new ReferenceData();
		ReferenceData rf2 = new ReferenceData();
		rf1.setType("ADD_TYPB");
		rf1.setId("00000001");
		rf1.setStart_Date("01/01/1900");
		rf1.setEnd_Date("01/01/2078");
		rf1.setValues("CORRESPONDENCE");
		rf2.setType("ADD_TYPB");
		rf2.setId("00000001");
		rf2.setStart_Date("01/01/1900");
		rf2.setEnd_Date("01/01/2078");
		rf2.setValues("RESIDENTIAL");
		listTest.add(rf1);
		listTest.add(rf2);

		if (list.size() == listTest.size()) {
			for (ReferenceData testList : listTest) {
				for (ReferenceData mainList : list) {
					if (testList.getId().equals(mainList.getId())
							&& testList.getStart_Date().equals(mainList.getStart_Date())
							&& testList.getEnd_Date().equals(mainList.getEnd_Date())
							&& testList.getValues().equals(mainList.getValues())) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
