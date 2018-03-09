package com.hmrc.itmp.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Properties;
import java.util.Scanner;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class ConfigService {

	@Autowired
	Environment env;

	Properties prop = new Properties();
	static final Logger log = Logger.getLogger(ConfigService.class);

	@SuppressWarnings("resource")
	public String getConfigProperty(String configKey) {
		log.debug("\n -- Inside getConfigProperty using configKey -- "
				+ configKey);

		if (this.prop.isEmpty()) {
			log.debug("\n -- Returning config key from :classpath environment: property file -- "
					+ env.getProperty(configKey));
			return env.getProperty(configKey);

		} else {
			log.debug("\n -- Returning config key from :System defined: property file -- "
					+ this.prop.getProperty(configKey));
			return this.prop.getProperty(configKey);
		}

	}

	public void init() {
		//filePath in System properties given in JBoss
		String filePath = System.getProperty("itmp_config_loc");
		log.debug("\n -- filePath in System properties given in JBoss -- "
				+ filePath);
		if (filePath != null) {
			log.info("\n :: Loading file data from system path ::");
			this.loadAndReturn(filePath);
		} 
	}

	private void loadAndReturn(String filePath) {
		Scanner sc = null;
		if (filePath != null || filePath != "") {
			File file = new File(filePath);
			try {
				FileInputStream fileInput = new FileInputStream(filePath);

				prop.load(fileInput);

			} catch (FileNotFoundException e) {
					log.debug("\n!!!FILE NOT FOUND!!!"+e);
			} catch (IOException e) {
				log.debug("\n!!!IO Exception!!!"+e);
			}
		}
	}

}
