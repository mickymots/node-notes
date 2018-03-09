package com.hmrc.itmp.applicationproxy.test;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import com.hmrc.itmp.controller.ApplicationProxyController;
import com.hmrc.itmp.service.ConfigService;
import com.hmrc.itmp.service.DigitalAdapterService;

@Configuration
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class ProxyAppConfig {

	@Bean(initMethod="init")
	public DigitalAdapterService digitalAdapterService() {
		return new DigitalAdapterService();
	}
	@Bean
	public ApplicationProxyController applicationProxyController() {
		return new ApplicationProxyController();
	}
	@Bean
	public ConfigService configService(){
		return new ConfigService();
	}

}