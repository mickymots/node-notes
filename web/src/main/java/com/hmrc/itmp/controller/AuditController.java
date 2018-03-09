package com.hmrc.itmp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hmrc.itmp.beans.AuditMessage;
import com.hmrc.itmp.common.Constants;
import com.hmrc.itmp.service.JmsMessageSender;

@RestController
@RequestMapping(value = "/services")
public class AuditController {

	static final Logger log = Logger.getLogger(AuditController.class);

	@Autowired
	JmsMessageSender jmsMessageSender;

	@RequestMapping(method = RequestMethod.POST, produces = "application/json", value = "/audit", consumes = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<String> auditHIB(
			@RequestBody AuditMessage auditMessage, HttpServletRequest req,
			@RequestHeader HttpHeaders httpHeaders) {
		log.debug("\n -- Audit Controller is being called and receiving auditMessages from request body -- \n"
				+ auditMessage.getRevenueActivity()
				+ "\n"
				+ auditMessage.getTpSessionDate()
				+ "\n"
				+ auditMessage.getOrgUnitID()
				+ "\n"
				+ auditMessage.getRevEmpID_PID()
				+ "\n"
				+ auditMessage.getTerminalID()
				+ "\n"
				+ auditMessage.getFuncProcresult()
				+ "\n"
				+ auditMessage.getFuncEndTime()
				+ "\n"
				+ auditMessage.getWiderAccessSignal()
				+ "\n"
				+ auditMessage.getPseudoTermID()
				+ "\n"
				+ auditMessage.getMachineDate()
				+ "\n"
				+ auditMessage.getUserRole()
				+ "\n"
				+ auditMessage.getTaxpayerReference()
				+ "\n"
				+ auditMessage.getSequence()
				+ "\n"
				+ auditMessage.getFunctionalParameters() + "\n");

		// Set the PID on the audit message from the UserPrincipal Object
		String pid = req.getUserPrincipal() != null ? req.getUserPrincipal().getName(): "";
		auditMessage.setRevEmpID_PID(pid);

		//set the ip address as received from load-balancer on the audit message
		if (httpHeaders.get("X-Forwarded-For") != null ) {
			List<String> remoteAddress = httpHeaders.get("X-Forwarded-For");
			auditMessage.setTerminalID(remoteAddress.get(0));
		}

		String FormattedAuditMessage = auditMessage
				.toFormattedMessage(Constants.Audit.DELIMITER);

		log.debug("\n -- FormattedAuditMessage -- \n" + FormattedAuditMessage);

		jmsMessageSender.sendAuditMessage(FormattedAuditMessage);
		HttpHeaders headers = new HttpHeaders();
		JSONObject json = new JSONObject();
		json.put("message", "Audited");
		ResponseEntity<String> entity = new ResponseEntity<String>(json.toJSONString(),
				headers, HttpStatus.OK);
		log.debug("\n -- Audit Controller returning response -- \n" + entity);

		return entity;
	}
}