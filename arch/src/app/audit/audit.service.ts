import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Audit } from './audit';
import { AuditModel } from './audit.model';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from './../navigation/navigation.service';
import { MessageService } from '../message-handler/message.service';
import { LoggingService } from '../logging/logging.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment'

@Injectable()
export class AuditService {
  _obj = this;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private loggingSerivce: LoggingService
  ) {}

  /**
   * This method creates object of Audit and setting required parameters, created object is passed to sendToServer method
   * @param args- AuditModel
   */
  public audit(auditmodel: AuditModel): void {
    let CurrentDate = moment();
    let auditMessage = new Audit(auditmodel);

    auditMessage.setRevenueActivity(this.navigationService.getRevenueActivity())
    auditMessage.setTpSessionDate(''); // passing blank value as per requirement
    auditMessage.setOrgUnitID(this.authService.getOrgUnitID())

    auditMessage.setRevEmpID_PID(''); //IPS will set this value
    auditMessage.setTerminalID(''); //IPS will set this value

    auditMessage.setFuncProcresult(0); // passing '0' value as per requirement
    auditMessage.setFuncEndTime(CurrentDate.format('hhmmss'))
    auditMessage.setWiderAccessSignal(''); // passing blank value as per requirement

    auditMessage.setSeudoTermID(''); //IPS will set this value
    auditMessage.setMachineDate(CurrentDate.format('YYYYMMDD'))

    auditMessage.setUserRole(this.authService
        .getRoles()
        .reduce((str, role) => {
          return str ?  str + role : role
        }, ''));



    this.sendToServer(auditMessage);
  }

  /**
   * This method posts the audit messages to the server.
   * @param args- Audit
   */
  sendToServer(auditMessage: Audit) {
    let url = environment.auditWebserviceURL;
    this.messageService.postForEntity(url, auditMessage).subscribe(
      () => {},
      error => {
        this.loggingSerivce.error('Audit message failed.' + error);
      }
    );
  }
}
