package com.hmrc.itmp.logger.test;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

import org.apache.log4j.Level;
import org.apache.log4j.LogManager;
import org.json.simple.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.google.gson.Gson;
import com.hmrc.itmp.controller.LoggerController;
import com.hmrc.itmp.filter.SimpleCORSFilter;
import com.hmrc.itmp.logger.test.LoggerAppConfig;
import com.hmrc.itmp.service.ConfigService;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { LoggerAppConfig.class })
public class LoggerGeneratorTest {

	// Creating loglevel JSON object
	JSONObject traceMessage, debugMessage, infoMessage, warnMessage,
			errorMessage, fatalMessage;

	boolean booleantrace = false, booleanerror = false, booleaninfo = false,
			booleandebug = false, booleanwarn = false, booleanfatal = false;
	String loggerJson;

	private MockMvc mockMvc;
	Scanner sc = null;


	@Autowired
	ConfigService configService;

	String filePath;


	@Autowired
	private LoggerController loggerController;

	@SuppressWarnings("unchecked")
	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(loggerController)
				.addFilters(new SimpleCORSFilter()).build();
<<<<<<< HEAD
        filePath = configService.getConfigProperty("LOGTESTFILEPATH");
=======
		filePath = configService.getConfigProperty("LOGTESTFILEPATH");
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2

		traceMessage = new JSONObject();
		traceMessage.put("message", "trace logging Message");
		traceMessage.put("logLevel", "trace");

		debugMessage = new JSONObject();
		debugMessage.put("message", "debug logging Message");
		debugMessage.put("logLevel", "debug");

		infoMessage = new JSONObject();
		infoMessage.put("message", "info logging Message");
		infoMessage.put("logLevel", "info");

		warnMessage = new JSONObject();
		warnMessage.put("message", "warn logging Message");
		warnMessage.put("logLevel", "warn");

		errorMessage = new JSONObject();
		errorMessage.put("message", "error logging Message");
		errorMessage.put("logLevel", "error");

		fatalMessage = new JSONObject();
		fatalMessage.put("message", "fatal logging Message");
		fatalMessage.put("logLevel", "fatal");

		// Clearing content of file each time before test runs
		clearTheFile();
	}

	// Testing for Trace Level Logging
	@Test
	public void testTraceLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Trace
		LogManager.getLogger("HIBClientLog").setLevel(Level.TRACE);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			// booleanfatal = line.contains("fatal") && line.contains("PID") &&
			// line.contains("Wednesday, May 17");
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {
			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(booleantrace);

	}

	// Testing for Debug Level Logging
	@Test
	public void testDebugLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Debug
		LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);

		// LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(!booleantrace);

	}

	// Testing for Info Level Logging
	@Test
	public void testInfoLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Trace
		LogManager.getLogger("HIBClientLog").setLevel(Level.INFO);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);

		// LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(!booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(!booleantrace);

	}

	// Testing for Warn Level Logging
	@Test
	public void testWarnLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Warn
		LogManager.getLogger("HIBClientLog").setLevel(Level.WARN);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(!booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);

		// LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(!booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(!booleantrace);

	}

	// Testing for Error Level Logging
	@Test
	public void testErrorLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Error
		LogManager.getLogger("HIBClientLog").setLevel(Level.ERROR);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(!booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(!booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);

		// LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(!booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(!booleantrace);

	}

	// Testing for Fatal Level Logging
	@Test
	public void testFatalLogging() throws Exception {

		File file = new File(filePath);
		sc = new Scanner(file);

		// validating file is empty
		assertTrue(file.length() == 0);

		// Setting LogLevel as Fatal
		LogManager.getLogger("HIBClientLog").setLevel(Level.FATAL);

		// Checking for Fatal Logging
		loggerJson = new Gson().toJson(fatalMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanfatal = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: fatal logging Message");
			break;
		}
		assertTrue(booleanfatal);

		// Checking for Error Logging
		loggerJson = new Gson().toJson(errorMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanerror = line.trim()
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: error logging Message");
			break;
		}
		assertTrue(!booleanerror);

		// Checking for Warn Logging
		loggerJson = new Gson().toJson(warnMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleanwarn = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: warn logging Message ");
			break;
		}
		assertTrue(!booleanwarn);

		// Checking for info Logging
		loggerJson = new Gson().toJson(infoMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleaninfo = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: info logging Message ");
			break;
		}
		assertTrue(!booleaninfo);

		// Checking for debug Logging
		loggerJson = new Gson().toJson(debugMessage);

		// LogManager.getLogger("HIBClientLog").setLevel(Level.DEBUG);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());
		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleandebug = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: debug logging Message ");
			break;
		}
		assertTrue(!booleandebug);

		// Checking for trace Logging
		loggerJson = new Gson().toJson(traceMessage);
		mockMvc.perform(
				post("/services/logger").accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(loggerJson).header("PID", "12345")
						.header("Timestamp", "Wednesday, May 17, 2017 3:10 PM")
						.header("version", "2.0")).andExpect(
				status().isCreated());

		while (sc.hasNextLine()) {

			String line = sc.nextLine();
			booleantrace = line
					.equalsIgnoreCase("PID -  :: Timestamp - Wednesday, May 17, 2017 3:10 PM :: Version - null :: trace logging Message ");
			break;
		}
		assertTrue(!booleantrace);

	}

	// This method clears log file content
	public void clearTheFile() {
		FileWriter fileWriter = null;
		try {
<<<<<<< HEAD
			System.out.println(filePath);
=======
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2
			fileWriter = new FileWriter(filePath,false);
		} catch (Exception e) {
			e.printStackTrace();
		}
		PrintWriter pwOb = new PrintWriter(fileWriter, false);
		pwOb.flush();
		pwOb.close();
		try {
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
