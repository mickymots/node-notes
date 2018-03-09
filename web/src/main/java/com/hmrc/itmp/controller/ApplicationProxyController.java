package com.hmrc.itmp.controller;

import java.util.concurrent.ExecutionException;

import com.hmrc.itmp.common.ListenableFutureHandler;
import com.hmrc.itmp.service.ConfigService;
import org.apache.log4j.Logger;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.hmrc.itmp.service.DigitalAdapterService;

@RestController
@RequestMapping(value = "/services")
public class ApplicationProxyController {

<<<<<<< HEAD
    static final Logger log = Logger.getLogger(ApplicationProxyController.class);

    @Autowired
    DigitalAdapterService digitalAdapterService;

    @Autowired
    ConfigService configService;

    private void addSystemDateOverride(HttpHeaders httpHeaders) {
        String dateOverride = this.configService.getConfigProperty("systemDate");
        if (dateOverride != null && dateOverride.trim().length() > 0)
            httpHeaders.set("x-dateoverride", dateOverride);
    }

    // NPS Proxy GET request comes in with URL like:
    // npsProxy?endPoint=a/1/b/2/c/3
    // This will pass the get request with endPoint request parameter to DA2
    // Service and returns the response
    // back to requester
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public DeferredResult<ResponseEntity<?>> getProxy(@RequestParam String endPoint,
                                                      @RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
            throws InterruptedException, ExecutionException {
        this.addSystemDateOverride(httpHeaders);

        log.debug(" NpsProxy request using GET EndPoint = " + endPoint);
        log.debug(" NpsProxy request using GET Target Name = " + target);

        final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
        ListenableFuture<ResponseEntity<String>> future = digitalAdapterService.makeRequest(endPoint,
                httpHeaders, target, HttpMethod.GET);

        future.addCallback(new ListenableFutureHandler(deferredResult));
        return deferredResult;
    }

    // NPS Proxy POST request comes in with URL like:
    // npsProxy?endPoint=a/1/b/2/c/3
    // This will pass the post request to DA2 Service
    @RequestMapping(method = RequestMethod.POST, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public DeferredResult<ResponseEntity<?>> postProxy(@RequestBody String reqContent, @RequestParam String endPoint,
                                                       @RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
            throws InterruptedException, ExecutionException, ParseException {

        this.addSystemDateOverride(httpHeaders);

        log.debug(" NpsProxy request Body = " + reqContent);
        log.debug(" NpsProxy request Headers = " + httpHeaders);
        log.debug(" NpsProxy request using POST EndPoint = " + endPoint);
        log.debug(" NpsProxy request using POST Target Name = " + target);

        final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
        ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
                .makeRequest(reqContent, endPoint, httpHeaders, target, HttpMethod.POST);

        future.addCallback(new ListenableFutureHandler(deferredResult));
        return deferredResult;
    }

    // NPS Proxy PUT request comes in with URL like:
    // npsProxy?endPoint=a/1/b/2/c/3
    // This will pass the PUT request to DA2 Service
    @RequestMapping(method = RequestMethod.PUT, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public DeferredResult<ResponseEntity<?>> putProxy(@RequestBody String reqContent, @RequestParam String endPoint,
                                                      @RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
            throws InterruptedException, ExecutionException, ParseException {

        this.addSystemDateOverride(httpHeaders);

        log.debug(" NpsProxy request Body = " + reqContent);
        log.debug(" NpsProxy request Headers =" + httpHeaders);
        log.debug(" NpsProxy request using PUT EndPoint =" + endPoint);
        log.debug(" NpsProxy request using PUT Target Name = " + target);

        final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
        ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
                .makeRequest(reqContent, endPoint, httpHeaders, target, HttpMethod.PUT);

        future.addCallback(new ListenableFutureHandler(deferredResult));
        return deferredResult;
    }

    // NPS Proxy delete request comes in with URL like:
    // npsProxy?endPoint=a/1/b/2/c/3
    // This will pass the request to DA2 Service
    @RequestMapping(method = RequestMethod.DELETE, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public DeferredResult<ResponseEntity<?>> deleteProxy(@RequestBody String reqContent, @RequestParam String endPoint,
                                                         @RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
            throws InterruptedException, ExecutionException, ParseException {
        this.addSystemDateOverride(httpHeaders);

        log.debug(" NpsProxy request Body = " + reqContent);
        log.debug(" NpsProxy request Headers = " + httpHeaders);
        log.debug(" NpsProxy request using EndPoint = " + endPoint);
        log.debug(" NpsProxy request using Target Name = " + target);

        final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
        ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
                .makeRequest(reqContent, endPoint, httpHeaders, target, HttpMethod.DELETE);

        future.addCallback(new ListenableFutureHandler(deferredResult));
        return deferredResult;
    }
=======
	static final Logger log = Logger.getLogger(ApplicationProxyController.class);

	@Autowired
	DigitalAdapterService digitalAdapterService;

	@Autowired
	ConfigService configService;

	private void addSystemDateOverride(HttpHeaders httpHeaders){
		String dateOverride = this.configService.getConfigProperty("systemDate");
		if(dateOverride != null && dateOverride.trim().length() >0)
		httpHeaders.set("x-dateoverride", dateOverride);
	}

	private void removeAuthHeader(HttpHeaders httpHeaders) {
		if (httpHeaders.containsKey(HttpHeaders.AUTHORIZATION)) {
			log.debug("Contains authorization header");
			httpHeaders.remove(HttpHeaders.AUTHORIZATION);
			log.debug("Headers after removing auth: " + httpHeaders.toString());
		}
	}

	// NPS Proxy GET request comes in with URL like:
	// npsProxy?endPoint=a/1/b/2/c/3
	// This will pass the get request with endPoint request parameter to DA2
	// Service and returns the response
	// back to requester
	@RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public DeferredResult<ResponseEntity<?>> getProxy(@RequestParam String endPoint,
			@RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
			throws InterruptedException, ExecutionException {

		this.addSystemDateOverride(httpHeaders);
		this.removeAuthHeader(httpHeaders);
		
		log.debug("\n -- NpsProxy request using GET EndPoint -- " + endPoint);
		log.debug("\n -- NpsProxy request using GET Target Name -- " + target);

		final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
		ListenableFuture<ResponseEntity<String>> future = digitalAdapterService.invokeDigitalAdapterServiceGet(endPoint,
				httpHeaders, target);

		future.addCallback(new ListenableFutureCallback<ResponseEntity<String>>() {

			@Override
			public void onFailure(Throwable t) {
				deferredResult.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(t));
			}

			@Override
			public void onSuccess(ResponseEntity<String> result) {
				log.debug("API Call :: RESULT BODY :: " + result.getBody());
				log.debug("API Call :: RESULT STATUS :: " + result.getStatusCode());
				
				
				if(result.getStatusCode().is4xxClientError())
				deferredResult.setResult(ResponseEntity.badRequest().body(result.getBody()));
				else 
					deferredResult.setResult(ResponseEntity.ok(result.getBody()));
			}
		});
		return deferredResult;
	}

		// NPS Proxy POST request comes in with URL like:
		// npsProxy?endPoint=a/1/b/2/c/3
		// This will pass the post request to DA2 Service
		@RequestMapping(method = RequestMethod.POST, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
		@ResponseStatus(HttpStatus.OK)
		public DeferredResult<ResponseEntity<?>> postProxy(@RequestBody String reqContent, @RequestParam String endPoint,
				@RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
				throws InterruptedException, ExecutionException, ParseException {
			
			this.addSystemDateOverride(httpHeaders);
			this.removeAuthHeader(httpHeaders);
			
			log.debug("\n -- NpsProxy request Body -- \n " + reqContent);
			log.debug("\n -- NpsProxy request Headers -- \n " + httpHeaders);
			log.debug("\n -- NpsProxy request using POST EndPoint -- " + endPoint);
			log.debug("\n -- NpsProxy request using POST Target Name -- " + target);
			
			final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
			ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
					.invokeDigitalAdapterServicePost(reqContent, endPoint, httpHeaders, target);
	
			future.addCallback(new ListenableFutureCallback<ResponseEntity<String>>() {
	
				@Override
				public void onFailure(Throwable t) {
					log.debug("API Call :: ERROR FLOW :: ");
					deferredResult.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(t));
				}
	
				@Override
				public void onSuccess(ResponseEntity<String> result) {
					log.debug("API Call :: RESULT BODY :: " + result.getBody());
					log.debug("API Call :: RESULT STATUS :: " + result.getStatusCode());
					
					
					if(result.getStatusCode().is4xxClientError())
						deferredResult.setResult(ResponseEntity.badRequest().body(result.getBody()));
					else {
						log.debug("Response from API :: " + result.getBody());
						deferredResult.setResult(ResponseEntity.ok(result.getBody()));
					}
				}
			});
			return deferredResult;
		}	

		// NPS Proxy PUT request comes in with URL like:
		// npsProxy?endPoint=a/1/b/2/c/3
		// This will pass the PUT request to DA2 Service
		@RequestMapping(method = RequestMethod.PUT, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
		@ResponseStatus(HttpStatus.OK)
		public DeferredResult<ResponseEntity<?>> putProxy(@RequestBody String reqContent, @RequestParam String endPoint,
				@RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
				throws InterruptedException, ExecutionException, ParseException {
			
			this.addSystemDateOverride(httpHeaders);
			this.removeAuthHeader(httpHeaders);
			
			log.debug("\n -- NpsProxy request Body -- \n " + reqContent);
			log.debug("\n -- NpsProxy request Headers -- \n " + httpHeaders);
			log.debug("\n -- NpsProxy request using PUT EndPoint -- " + endPoint);
			log.debug("\n -- NpsProxy request using PUT Target Name -- " + target);
	
			final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
			ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
					.invokeDigitalAdapterServicePUT(reqContent, endPoint, httpHeaders, target);
	
			future.addCallback(new ListenableFutureCallback<ResponseEntity<String>>() {
	
				@Override
				public void onFailure(Throwable t) {
					deferredResult.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(t));
				}
	
				@Override
				public void onSuccess(ResponseEntity<String> result) {
					log.debug("API Call :: RESULT BODY :: " + result.getBody());
					log.debug("API Call :: RESULT STATUS :: " + result.getStatusCode());
					
					
					if(result.getStatusCode().is4xxClientError())
						deferredResult.setResult(ResponseEntity.badRequest().body(result.getBody()));
					else 
						deferredResult.setResult(ResponseEntity.ok(result.getBody()));
				}
			});
			return deferredResult;
		}
	
	    // NPS Proxy delete request comes in with URL like:
		// npsProxy?endPoint=a/1/b/2/c/3
		// This will pass the request to DA2 Service
		@RequestMapping(method = RequestMethod.DELETE, produces = "application/json", value = "/npsProxy/{target}", consumes = "application/json")
		@ResponseStatus(HttpStatus.OK)
		public DeferredResult<ResponseEntity<?>> deleteProxy(@RequestBody String reqContent, @RequestParam String endPoint,
				@RequestHeader HttpHeaders httpHeaders, @PathVariable String target)
				throws InterruptedException, ExecutionException, ParseException {

			this.addSystemDateOverride(httpHeaders);
			this.removeAuthHeader(httpHeaders);
			
			log.debug("\n -- NpsProxy request Body -- \n " + reqContent);
			log.debug("\n -- NpsProxy request Headers -- \n " + httpHeaders);
			log.debug("\n -- NpsProxy request using EndPoint -- " + endPoint);
			log.debug("\n -- NpsProxy request using Target Name -- " + target);

			

			final DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();
			ListenableFuture<ResponseEntity<String>> future = digitalAdapterService
					.invokeDigitalAdapterServiceDelete(reqContent, endPoint, httpHeaders, target);

			future.addCallback(new ListenableFutureCallback<ResponseEntity<String>>() {

				@Override
				public void onFailure(Throwable t) {
					deferredResult.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(t));
				}

				@Override
				public void onSuccess(ResponseEntity<String> result) {
					log.debug("API Call :: RESULT BODY :: " + result.getBody());
					log.debug("API Call :: RESULT STATUS :: " + result.getStatusCode());
					
					
					if(result.getStatusCode().is4xxClientError())
						deferredResult.setResult(ResponseEntity.badRequest().body(result.getBody()));
					else 
						deferredResult.setResult(ResponseEntity.ok(result.getBody()));
				}
			});
			return deferredResult;
		}
>>>>>>> c250e567e33560d8a0110f8451f17d399ddea0e2
}