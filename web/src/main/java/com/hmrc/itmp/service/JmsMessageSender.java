package com.hmrc.itmp.service;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import com.hmrc.itmp.beans.AuditMessage;

@Service
public class JmsMessageSender {

	static final Logger log = Logger.getLogger(JmsMessageSender.class);
	
	@Autowired
	private JmsTemplate jmsTemplate;

	@Autowired
	private Destination dest;
	
	/**
	* Send Audit message to a specified destination
	* @param auditMessage
	*/
	public void sendAuditMessage(final String auditMessage) {

		log.info("\n :: Send Audit Message is initialised :: \n");
		this.jmsTemplate.send(dest, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				if (log.isDebugEnabled()) {
	                log.debug("Start of MessagePublisher publishRequest");
	            }
				Message message = session.createTextMessage(auditMessage);
				return message;
			}
		});
		log.info("\n :: Audit Message is sent successfully :: \n");
	}
}