/**
 * Model Class with properties set by architecture to send audit messages on server
 */
import {AuditModel, AuditSequence}  from './audit.model'

export class Audit {
  revenueActivity: string;
  tpSessionDate: string;
  orgUnitID: string;
  revEmpID_PID: string;
  terminalID: string;
  funcProcresult: number;
  funcEndTime: string;
  widerAccessSignal: string;
  pseudoTermID: string;
  machineDate: string;
  userRole: string;
  taxpayerReference: string;
  sequence: AuditSequence;
  functionalParameters: string[];

  constructor(auditModel: AuditModel) {
   this.taxpayerReference = auditModel.taxpayerReference
   this.sequence = auditModel.sequence
   this.functionalParameters = auditModel.functionalParameters
  }

  setRevenueActivity(revenueActivity) {
    this.revenueActivity = revenueActivity;
  }
   setTpSessionDate(tpSessionDate) {
    this.tpSessionDate = tpSessionDate;
  }
  setOrgUnitID(orgUnitID) {
    this.orgUnitID = orgUnitID;
  }
  setRevEmpID_PID(revEmpID_PID) {
    this.revEmpID_PID = revEmpID_PID;
  }
  setTerminalID(terminalID) {
    this.terminalID = terminalID;
  }
  setFuncProcresult(funcProcresult) {
    this.funcProcresult = funcProcresult;
  }
  setFuncEndTime(funcEndTime) {
    this.funcEndTime = funcEndTime;
  }
  setSeudoTermID(pseudoTermID) {
    this.pseudoTermID = pseudoTermID;
  }
  setWiderAccessSignal(widerAccessSignal) {
    this.widerAccessSignal = widerAccessSignal;
  }
  setMachineDate(machineDate) {
    this.machineDate = machineDate;
  }
  setUserRole(userRole) {
    this.userRole = userRole;
  }
}
