package com.hmrc.itmp.logger.test;

import com.hmrc.itmp.controller.LoggerController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.web.client.RestTemplate;

import com.hmrc.itmp.service.ConfigService;

@Configuration
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class LoggerAppConfig {

	@Bean
	public RestTemplate template() {
		return new RestTemplate();
	}

	@Bean
	public ConfigService configService(){
		return new ConfigService();
	}

<<<<<<< HEAD
    @Bean
    public LoggerController loggerController() {
        return new LoggerController();
    }
=======
	@Bean
	public LoggerController loggerController() {
		return new LoggerController();
	}
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2

}