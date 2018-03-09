package com.hmrc.itmp.permissioncontroller.test;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import com.hmrc.itmp.beans.ResourceData;
import com.hmrc.itmp.beans.UserDetails;
import com.hmrc.itmp.beans.UserResources;
import com.hmrc.itmp.controller.PermissionController;
import com.hmrc.itmp.security.SecurityManager;
import com.hmrc.itmp.security.UserRoleHashMap;
import com.hmrc.itmp.security.X500Impl;
import com.hmrc.itmp.service.ConfigService;
import com.hmrc.itmp.service.PermissionFileManager;

@Configuration
@PropertySources(value = { @PropertySource("classpath:/config.properties") })
public class PermissionAppConfig { 

	@Bean
	public PermissionController permissionController() {
		return new PermissionController();
	}

	@Bean
	public UserRoleHashMap userRoleHashMap() {
		return new UserRoleHashMap();
	}

	@Bean
	public SecurityManager securityManager() {
		return new SecurityManager();
	}

	@Bean
	public UserResources userResources() {
		return new UserResources();
	}

	@Bean
	public ResourceData resourceData() {
		return new ResourceData();
	}

	@Bean
	public PermissionFileManager permissionFileManager() {
		return new PermissionFileManager();
	}

	@Bean
	public X500Impl userDirectoryStub() {
		return new X500Impl();
	}

	@Bean
	public UserDetails userDetails() {
		return new UserDetails();
	}

	@Bean
	public ConfigService configService() {
		return new ConfigService();
	}
}
