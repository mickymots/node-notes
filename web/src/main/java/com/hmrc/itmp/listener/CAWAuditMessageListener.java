package com.hmrc.itmp.listener;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.jms.JMSException;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.listener.SessionAwareMessageListener;

import com.hmrc.itmp.beans.AuditMessage;
import com.hmrc.itmp.service.ConfigService;

public class CAWAuditMessageListener implements
		SessionAwareMessageListener<TextMessage> {

	@Autowired
	ConfigService configService;
	String ITMP_AUDIT_FILE_PATH = null;
	private PrintWriter outputWriter = null;
	static final Logger log = Logger.getLogger(CAWAuditMessageListener.class);
	private static final SimpleDateFormat AUDIT_FILE_DATESTAMP = new SimpleDateFormat(
			"yyyyMMdd");

	public void init() {
		log.info("\n :: CAWAuditMessageListener init() invoked :: \n");
		ITMP_AUDIT_FILE_PATH = configService
				.getConfigProperty("ITMP_AUDIT_FILE_PATH");
	}

	private AuditMessage auditMessage;

	FileWriter fw = null;
	BufferedWriter bw = null;
	private long startOfTomorrow = 0L;

	@Override
	public void onMessage(TextMessage message, Session session)
			throws JMSException {
		log.info("\n :: CAW Audit message listner onMessage invoked :: \n");
		log.debug("\n -- CAW Audit message -- " + message.getText());
		String auditJmsMessage = message.getText();
		log.debug("\n -- auditJmsMessage send for file writing -- \n"
				+ auditJmsMessage);
		jmsQueueFileWite(auditJmsMessage);

	}

	public AuditMessage getAuditMessages() throws Exception {
		return this.auditMessage;
	}

	private void rollFile() throws Exception {
		// get today's date
		Calendar cal = Calendar.getInstance();

		// set up log file name for today
		String datestamp = AUDIT_FILE_DATESTAMP.format(cal.getTime());
		String logfile = configService
				.getConfigProperty("ITMP_AUDIT_FILE_PATH");
		logfile += "_" + datestamp + ".log";

		// append to existing or create new log file as required
		outputWriter = new PrintWriter(new FileWriter(logfile, true), true);

		// calculate the time in milliseconds when tomorrow starts
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH);
		int day = cal.get(Calendar.DAY_OF_MONTH) + 1;

		cal.clear();
		cal.set(year, month, day);
		startOfTomorrow = cal.getTimeInMillis();
	}

	public void jmsQueueFileWite(String jmsMessageContent) {
		log.info("\n\n\n :: Inside JMSQueueFileWrite ::  \n");
		try {
			long currentTime = System.currentTimeMillis();
			// check if current time is >= start of tomorrow
			// (midnight has elapsed)
			if (currentTime >= startOfTomorrow) {
				log.debug("\n :: Content has been writen into Next Date ITMPCawAuditJMSQueueFile File :: -- \n");
				// set new output file for today
				rollFile();
			}

			outputWriter.println(jmsMessageContent);
			log.debug("\n :: Content has been writen into ITMPCawAuditJMSQueueFile File :: -- \n");

		} catch (IOException e) {
			log.error("\n !! IO Exception while writing to file !! \n" + e);
		} catch (Exception e) {
			log.error("CawAuditMessageListener.onMessage: Exception caught", e);
			outputWriter = null;
			throw new RuntimeException(e);
		} finally {

			try {
				log.info("\n :: Finally closing writer :: \n");
				if (bw != null)
					bw.close();

				if (fw != null)
					fw.close();

			} catch (IOException e) {
				log.error("\n !!Finally closing writer Error!!  \n" + e);
			}
		}
	}

}
