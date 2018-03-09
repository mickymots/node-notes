package com.hmrc.itmp.audit.test;

			import static org.junit.Assert.assertEquals;

		import javax.jms.JMSException;
		import javax.jms.ObjectMessage;
		import javax.jms.Session;
		import javax.jms.TextMessage;

		import org.apache.log4j.Logger;
		import org.springframework.jms.listener.SessionAwareMessageListener;
		import org.springframework.stereotype.Service;

		import com.hmrc.itmp.beans.AuditMessage;

@Service
public class AuditMessageListnerTest implements SessionAwareMessageListener<TextMessage> {

	static final Logger log = Logger.getLogger("debugLog");

	private AuditMessage auditMessage;

	@Override
	public void onMessage(TextMessage message, Session session)
			throws JMSException {
		log.info("\n :: CAW TEST Audit message listner onMessage invoked :: \n");
		log.debug("\n -- CAW TEST Audit message -- " + message.getText());
		String auditJmsMessage = message.getText();
		log.debug("\n -- auditJmsMessage TEST send for file writing -- \n"
				+ auditJmsMessage);

	}

	public AuditMessage getAuditMessages() throws Exception{
		Thread.sleep(1000L);
		return this.auditMessage;
	}

}

