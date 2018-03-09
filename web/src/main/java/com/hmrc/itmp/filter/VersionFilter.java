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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.hmrc.itmp.service.ConfigService;

/**
 * Servlet Filter implementation class VersionFilter, for checking client
 * application version is updated or not.
 */
@Configuration
public class VersionFilter implements Filter {

	@Autowired
	ConfigService configService;

	static final Logger log = Logger.getLogger(VersionFilter.class);

	public VersionFilter() {
		log.info("\n:: Inside VersionFilter Default Constructor ::");
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		log.info("\n :: init method ::  ");
	}

	/**
	 * This method checks the existing version of application with the version
	 * present in the request headers
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		log.info("\n::Invoked Version Filter doFilter method:: ");

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		log.debug("\n -- Request method --" + req.getMethod());

		if (!"OPTIONS".equalsIgnoreCase(req.getMethod())) {

			// String version = env.getProperty("VERSION");
			String version = configService.getConfigProperty("VERSION");
			log.debug("\n -- Current IPS version --  " + version);

			String requestedVersion = req.getHeader("version");

			log.debug("\n -- Current IBR version --  " + requestedVersion);

			if (requestedVersion != null
					&& !requestedVersion.equalsIgnoreCase(version)) {
				log.debug("\n -- IPS and IBR using Different Versions -- ");

				res.setHeader("version", "Old Vesion");
				res.sendError(403, "Application has been updated at server");
				log.debug("\n -- IPS Sending 403 error and version header as Old Version -- ");
			}
		} else
			log.debug("\n -- preflight request passed through --");

		chain.doFilter(request, response);
	}

	public void destroy() {
		log.info("\n:: Inside VersionFilter Destroy method ::");
	}

}
