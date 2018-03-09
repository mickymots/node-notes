package com.hmrc.itmp.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {

	static final Logger log = Logger.getLogger(SimpleCORSFilter.class);

	public SimpleCORSFilter() {
		log.info("\n :: SimpleCORSFilter init :: ");
	}

	@Override
	public void init(FilterConfig filterConfig) {
	}

	@SuppressWarnings("unused")
	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {

		log.info("\n ::Invoked CORS Filter and setting required headers :: ");

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "false");
		response.setHeader("Access-Control-Allow-Methods",
				"POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader(
				"Access-Control-Allow-Headers",
				"Content-Type, Accept, X-Requested-With, remember-me, Timestamp, PID, version, Access-Control-Allow-Origin");
		response.setHeader("Content-Type", "application/json");
		response.setHeader("X-UA-Compatible", "IE=edge");

		chain.doFilter(req, res);

	}

	@Override
	public void destroy() {
	}

}