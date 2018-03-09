import { Component, OnInit, Injector, ElementRef, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { DateComponent } from './../date/date.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { VALIDATOR_FUNCTIONS } from './../../base/validator-functions';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';
import { ComponentConfig } from '../../base/component-config';
import * as moment from 'moment';

@Component({
  selector: 'date-of-birth',
  templateUrl: './date-of-birth.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateOfBirthComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: DateOfBirthComponent, multi: true }
  ]
})
export class DateOfBirthComponent extends DateComponent implements OnInit {
  public activeDate = moment(new Date()).toDate();
  public maxDate = moment(new Date()).toDate();
  public config = {
    id: this.camelize(LABELS.DATE_OF_BIRTH),
    label: LABELS.DATE_OF_BIRTH,
    pattern: REGEX.DATE[this.format],
    required: true,
    validatorFn: VALIDATOR_FUNCTIONS.CHILD_DOB_MIN_MAX(
      this.minDate,
      this.maxDate
    ),
    messages: {
      maxDate: MessageBuilder(
        LABELS.DATE_OF_BIRTH,
        ERROR_MESSAGE_STRINGS.FUTURE_DATE
      ),
      minDate: MessageBuilder(
        LABELS.DATE_OF_BIRTH,
        ERROR_MESSAGE_STRINGS.CHILD_DOB_MIN_DATE
      ),
      pattern: MessageBuilder(
        LABELS.DATE_OF_BIRTH,
        ERROR_MESSAGE_STRINGS.DATE_FORMAT_DDMMYYYY
      )
    }
  };

  constructor(_injector: Injector, public _eref: ElementRef) {
    super(_injector, _eref);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
