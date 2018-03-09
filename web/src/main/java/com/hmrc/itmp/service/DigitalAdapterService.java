package com.hmrc.itmp.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.client.AsyncRestTemplate;

<<<<<<< HEAD
=======
import javax.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2
import java.util.concurrent.ExecutionException;

@Service
public class DigitalAdapterService {

	static final Logger log = Logger.getLogger(DigitalAdapterService.class);

	@Autowired
	ConfigService configService;

	String targetEndPoint = null;
	
	AsyncRestTemplate restTemplate;
	

	public void init() {
		log.info("\n :: Invoked DigitalAdapterService init() ::");
		
		this.restTemplate = new AsyncRestTemplate();
		CustomErrorHandler errorHandler = new CustomErrorHandler();
		this.restTemplate.setErrorHandler(errorHandler);
	}

<<<<<<< HEAD
	public ListenableFuture<ResponseEntity<String>> makeRequest(String request, String endPoint,
																HttpHeaders httpHeaders, String target, HttpMethod method) throws InterruptedException, ExecutionException {
=======
	private HttpHeaders addAuthenticationHeader(HttpHeaders httpHeaders){

		String authStore = configService.getConfigProperty("AUTH_STORE");
		try {
			File file = new File(authStore);
			Scanner scanner = new Scanner(file);

			if(scanner.hasNextLine()) {
				String line = scanner.nextLine();
				byte[] message = line.getBytes();
				String encodedAuth = DatatypeConverter.printBase64Binary(message);

				httpHeaders.add("Authorization", "Basic " + encodedAuth);
			}else{
				log.error("Auth Store file couldn't be read. Please make sure first line is not empty and contains valid information. ");
			}
		}catch (FileNotFoundException e){
			log.error("AuthStore file not found " + e);
		}
		return httpHeaders;
	}

	public ListenableFuture<ResponseEntity<String>> invokeDigitalAdapterServiceGet(String endPoint,
			HttpHeaders httpHeaders, String target) throws InterruptedException, ExecutionException {
		log.info("\n :: Invoked DA2 GET request ::");
		
		targetEndPoint = configService.getConfigProperty(target);
		String url = targetEndPoint + endPoint;

		if("SLS".equalsIgnoreCase(target))
			httpHeaders = this.addAuthenticationHeader(httpHeaders);

		log.debug("\n -- Passing targetEndPoint GET URL -- " + url);
		log.debug("\n -- Request headers -- " + httpHeaders.toString());
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2

		HttpEntity<String> requestEntity = new HttpEntity<String>(request, httpHeaders);
		return this.callService(endPoint, target, method, requestEntity);
	}

<<<<<<< HEAD
	public ListenableFuture<ResponseEntity<String>> makeRequest(String endPoint,
																HttpHeaders httpHeaders, String target, HttpMethod method) throws InterruptedException, ExecutionException {
		HttpEntity<String> requestEntity = new HttpEntity<String>(httpHeaders);
		return this.callService(endPoint, target, method, requestEntity);
=======
	public ListenableFuture<ResponseEntity<String>> invokeDigitalAdapterServicePost(String req, String endPoint,
			HttpHeaders httpHeaders, String target) throws InterruptedException, ExecutionException, ParseException {
		log.info("\n :: Invoked targetEndPoint POST request ::");

		
		targetEndPoint = configService.getConfigProperty(target);
		String url = targetEndPoint + endPoint;

		if("SLS".equalsIgnoreCase(target))
			httpHeaders = this.addAuthenticationHeader(httpHeaders);

		log.debug("\n -- targetEndPoint POST URL -- " + url);
		log.debug("\n -- Request headers -- " + httpHeaders.toString());

		Class<String> responseType = String.class;
		HttpEntity<String> requestEntity = new HttpEntity<String>(req, httpHeaders);

		ListenableFuture<ResponseEntity<String>> future = restTemplate.exchange(url, HttpMethod.POST, requestEntity,
				responseType);
		log.debug("\n -- FUTURE POST --");

		return future;
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2
	}

	private ListenableFuture<ResponseEntity<String>> callService (String endPoint, String target, HttpMethod method, HttpEntity<String> requestEntity){

<<<<<<< HEAD
		log.info(" Invoked DA2 request ");

		targetEndPoint = configService.getConfigProperty(target);
		String url = targetEndPoint + endPoint;
		log.debug(" Target EndPoint URL = " + url);
=======
		// Fetching Digital Adapter rest end point from configService
		targetEndPoint = configService.getConfigProperty(target);
		String url = targetEndPoint + endPoint;

		log.debug("\n -- targetEndPoint PUT URL -- " + url);
		log.debug("\n -- Request headers -- " + httpHeaders.toString());

		if("SLS".equalsIgnoreCase(target))
			httpHeaders = this.addAuthenticationHeader(httpHeaders);

		Class<String> responseType = String.class;
		HttpEntity<String> requestEntity = new HttpEntity<String>(req, httpHeaders);

		ListenableFuture<ResponseEntity<String>> future = restTemplate.exchange(url, HttpMethod.PUT, requestEntity,
				responseType);
		log.debug("\n -- FUTURE PUT --");

		return future;
	}
	
	public ListenableFuture<ResponseEntity<String>> invokeDigitalAdapterServiceDelete(String req, String endPoint,
			HttpHeaders httpHeaders, String target) throws InterruptedException, ExecutionException, ParseException {
		log.info("\n :: Invoked targetEndPoint DELETE request ::");

		// Fetching Digital Adapter rest end point from configService

		targetEndPoint = configService.getConfigProperty(target);
		String url = targetEndPoint + endPoint;

		if("SLS".equalsIgnoreCase(target))
			httpHeaders = this.addAuthenticationHeader(httpHeaders);

		log.debug("\n -- targetEndPoint DELETE URL -- " + url);
		log.debug("\n -- Request headers -- " + httpHeaders.toString());
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2

		Class<String> responseType = String.class;
		ListenableFuture<ResponseEntity<String>> future = this.restTemplate.exchange(url, method, requestEntity,
				responseType);

		return future;
	}
}