package com.hmrc.itmp.beans;

import java.io.Serializable;

import org.apache.log4j.Logger;

public class AuditMessage implements Serializable {

	private static final long serialVersionUID = 1L;
	static final Logger log = Logger.getLogger(AuditMessage.class);

	String taxpayerReference;
	String sequence;
	String functionalParameters[];

	String tpSessionDate;
	int funcProcresult;
	String widerAccessSignal;

	String machineDate;
	String funcEndTime;
	String pseudoTermID;

	String revEmpID_PID;
	String userRole;
	String terminalID;

	String revenueActivity;
	String orgUnitID;

	public String getFuncEndTime() {
		return funcEndTime;
	}

	public int getFuncProcresult() {
		return funcProcresult;
	}

	public String[] getFunctionalParameters() {
		return functionalParameters;
	}

	public String getMachineDate() {
		return machineDate;
	}

	public String getOrgUnitID() {
		return orgUnitID;
	}

	public String getPseudoTermID() {
		return pseudoTermID;
	}

	public String getRevEmpID_PID() {
		return revEmpID_PID;
	}

	public String getRevenueActivity() {
		return revenueActivity;
	}

	public String getSequence() {
		return sequence;
	}

	public String getTaxpayerReference() {
		return taxpayerReference;
	}

	public String getTerminalID() {
		return terminalID;
	}

	public String getTpSessionDate() {
		return tpSessionDate;
	}

	public String getUserRole() {
		return userRole;
	}

	public String getWiderAccessSignal() {
		return widerAccessSignal;
	}

	public void setFuncEndTime(String funcEndTime) {
		this.funcEndTime = funcEndTime;
	}

	public void setFuncProcresult(int funcProcresult) {
		this.funcProcresult = funcProcresult;
	}

	public void setFunctionalParameters(String[] functionalParameters) {
		this.functionalParameters = functionalParameters;
	}

	public void setMachineDate(String machineDate) {
		this.machineDate = machineDate;
	}

	public void setOrgUnitID(String orgUnitID) {
		this.orgUnitID = orgUnitID;
	}

	public void setPseudoTermID(String pseudoTermID) {
		this.pseudoTermID = pseudoTermID;
	}

	public void setRevEmpID_PID(String revEmpID_PID) {
		this.revEmpID_PID = revEmpID_PID;
	}

	public void setRevenueActivity(String revenueActivity) {
		this.revenueActivity = revenueActivity;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public void setTaxpayerReference(String taxpayerReference) {
		this.taxpayerReference = taxpayerReference;
	}

	public void setTerminalID(String terminalID) {
		this.terminalID = terminalID;
	}

	public void setTpSessionDate(String tpSessionDate) {
		this.tpSessionDate = tpSessionDate;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public void setWiderAccessSignal(String widerAccessSignal) {
		this.widerAccessSignal = widerAccessSignal;
	}

	@Override
	public String toString() {
		return "revenueActivity : " + this.revenueActivity + "tpSessionDate : "
				+ this.tpSessionDate + "orgUnitID : " + this.orgUnitID
				+ "revEmpID_PID : " + this.revEmpID_PID + "terminalID : "
				+ this.terminalID + "funcProcresult : " + this.funcProcresult
				+ "funcEndTime : " + this.funcEndTime + "widerAccessSignal : "
				+ this.widerAccessSignal + "pseudoTermID : "
				+ this.pseudoTermID + "machineDate : " + this.machineDate
				+ "userRole : " + this.userRole + "taxpayerReference : "
				+ this.taxpayerReference + "sequence : " + this.sequence
				+ "functionalParameters : " + this.functionalParameters;
	}

	public String toFormattedMessage(char delimiter) {

		log.debug("\n Inside toFormat Message() -- ");
		StringBuilder sb = new StringBuilder();

		sb.append(revenueActivity == null ? "" : revenueActivity);
		sb.append(delimiter);
		sb.append(tpSessionDate == null ? "" : tpSessionDate);
		sb.append(delimiter);
		sb.append(orgUnitID == null ? "" : orgUnitID);
		sb.append(delimiter);
		sb.append(revEmpID_PID == null ? "" : revEmpID_PID);
		sb.append(delimiter);
		sb.append(terminalID == null ? "" : terminalID);
		sb.append(delimiter);
		sb.append(funcProcresult);
		sb.append(delimiter);
		sb.append(funcEndTime);
		sb.append(delimiter);
		sb.append(widerAccessSignal == null ? "" : widerAccessSignal);
		sb.append(delimiter);
		sb.append(pseudoTermID == null ? "" : pseudoTermID);
		sb.append(delimiter);
		sb.append(machineDate);
		sb.append(delimiter);
		sb.append(userRole == null ? "" : userRole);
		sb.append(delimiter);
		sb.append(taxpayerReference == null ? "" : taxpayerReference);
		sb.append(delimiter);
		sb.append(sequence == null ? "" : sequence);
		

		if(functionalParameters != null) {
			log.debug("\n Starting Functional Param -- " + functionalParameters.length);
			int placeHoldersCount = 40 - functionalParameters.length;

			for (int i = 0; i < functionalParameters.length; i++) {
				sb.append(delimiter);
				sb.append(functionalParameters[i]);
			}
			for(int i = 0; i< placeHoldersCount; i++){
				sb.append(delimiter);
			}
			log.debug("\n Starting Functional Param end::-- ");
		}
		return sb.toString();
	}
}
