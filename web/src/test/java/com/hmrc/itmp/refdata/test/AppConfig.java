package com.hmrc.itmp.refdata.test;

import com.hmrc.itmp.service.ReferenceDataLoaderService;
import com.hmrc.itmp.service.ReferenceDataService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.web.client.RestTemplate;

import com.hmrc.itmp.service.ConfigService;

@Configuration
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class AppConfig {

	// Method is used to return data for ReferenceDataLoaderService
	@Bean
	public ReferenceDataLoaderService getReferenceDataLoaderServiceBean() {
		return new ReferenceDataLoaderService();
	}

	// Mehod is used to invoke init method for ReferenceDataService
	@Bean(initMethod = "init")
	public ReferenceDataService getReferenceDataCacheBean() {
		return new ReferenceDataService();
	}

	// Bean defined for Logger Generator Test Class methods
	@Bean
	public RestTemplate template() {
		return new RestTemplate();
	}

	@Bean
	public ConfigService configService(){
		return new ConfigService();
	}
	
}