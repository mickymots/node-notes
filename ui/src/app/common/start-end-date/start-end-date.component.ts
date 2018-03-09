import { Component, OnInit, ElementRef, Injector, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroup
} from '@angular/forms';
import { DateComponent } from '../date/date.component';
import { LABELS } from '../../base/labels';
import { REGEX } from '../../base/regex';
import { MessageBuilder } from '../../base/error-message';
import * as moment from 'moment';

@Component({
  selector: 'app-start-end-date',
  templateUrl: './start-end-date.component.html',
  styleUrls: ['./start-end-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StartEndDateComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: StartEndDateComponent, multi: true }
  ]
})
export class StartEndDateComponent extends DateComponent implements OnInit {
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() startDateControlName: string = 'startDate';
  @Input() endDateControlName: string = 'endDate';
  @Input() startDateLabel: string = LABELS.START_DATE;
  @Input() endDateLabel: string = LABELS.END_DATE;
  @Input() startDateId: string = this.camelize(LABELS.START_DATE);
  @Input() endDateId: string = this.camelize(LABELS.END_DATE);
  @Input() startDateSize;
  @Input() endDateSize;
  @Input() startDateRequired: boolean = false;
  @Input() endDateRequired: boolean = false;

  public activeDate = moment(new Date())
    .add(1, 'days')
    .toDate();
  public format: string = 'DD/MM/YYYY';
  public startDate: Date = null;
  public endDate: Date = null;
  public startConfig: Object;
  public endConfig: Object;

  constructor(_injector: Injector, public _eref: ElementRef) {
    super(_injector, _eref);
  }

  ngOnInit() {
    this.setStartConfig();
    this.setEndConfig();
    setTimeout(() => {
      // delay setting watchers to avoid validation errors (if fields are mandatory) on display
      this.setWatchers();
    }, 1000);
  }

  setStartConfig() {
    this.startConfig = {
      label: this.startDateLabel,
      pattern: REGEX.DATE[this.format],
      required: this.startDateRequired,
      validatorFn: this.validateStartDate(),
      maxlength: 10,
      messages: {
        default: MessageBuilder(
          this.startDateLabel,
          'cannot be after ' + this.endDateLabel
        ),
        date: MessageBuilder(this.startDateLabel, 'must be a valid date'),
        minDate: MessageBuilder(
          this.startDateLabel,
          'cannot be before',
          moment(this.minDate).format(this.format)
        ),
        maxDate: MessageBuilder(
          this.startDateLabel,
          'cannot be after',
          moment(this.maxDate).format(this.format)
        )
      }
    };
  }

  private setWatchers(): void {
    // trigger validation when date-picker changes date
    this.form.get(this.startDateControlName).valueChanges.subscribe(value => {
      this.form.get(this.startDateControlName).markAsTouched();
    });
    this.form.get(this.endDateControlName).valueChanges.subscribe(value => {
      this.form.get(this.endDateControlName).markAsTouched();
    });
  }

  setEndConfig() {
    this.endConfig = {
      label: this.endDateLabel,
      pattern: REGEX.DATE[this.format],
      required: this.endDateRequired,
      validatorFn: this.validateEndDate(),
      maxlength: 10,
      messages: {
        default: MessageBuilder(
          this.endDateLabel,
          'cannot be before ' + this.startDateLabel
        ),
        date: MessageBuilder(this.endDateLabel, 'must be a valid date'),
        minDate: MessageBuilder(
          this.endDateLabel,
          'cannot be before',
          moment(this.minDate).format(this.format)
        ),
        maxDate: MessageBuilder(
          this.endDateLabel,
          'cannot be after',
          moment(this.maxDate).format(this.format)
        )
      }
    };
  }

  validateStartDate(): ValidatorFn {
    return (control: AbstractControl) => {
      // Store date type value in variable
      let newStartDate = moment(control.value, this.format).toDate();

      // Store if equal
      let equal = moment(this.startDate).isSame(newStartDate);

      // Store class property
      this.startDate = newStartDate;

      // Is a valid date
      let isValid = this.isValid(this.startDate);
      if (!isValid && control.value != '') return { date: { valid: false } };

      // Is after the min date
      let isAfterMin = this.isAfterMin(this.startDate, this.minDate);
      if (!isAfterMin && control.value != '')
        return { minDate: { valid: false } };

      // Is before the max date
      let isBeforeMax = this.isBeforeMax(this.startDate, this.maxDate);
      if (!isBeforeMax && control.value != '')
        return { maxDate: { valid: false } };

      // Cross Validation check the dates are equal or one day apart
      if (this.isValid(this.startDate) && this.isValid(this.endDate)) {
        let isCrossValid = this.isEqualOrBefore(this.startDate, this.endDate);
        if (!isCrossValid) return { default: { valid: false } };
      }

      // Update end date validity
      let endDate = this.form.get(this.endDateControlName);
      if (endDate) {
        equal === false &&
          (endDate.value != '' && endDate.setValue(endDate.value));
      }
    };
  }

  validateEndDate(): ValidatorFn {
    return (control: AbstractControl) => {
      // Store date type in variable
      let newEndDate = moment(control.value, this.format).toDate();

      // Store is equal
      let equal = this.isEqual(this.endDate, newEndDate);

      // Store class property
      this.endDate = newEndDate;

      // Is a valid date
      let isValid = this.isValid(this.endDate);
      if (!isValid && control.value != '') return { date: { valid: false } };

      // Is after the min date
      let isAfterMin = this.isAfterMin(this.endDate, this.minDate);
      if (!isAfterMin && control.value != '')
        return { minDate: { valid: false } };

      // Is before the max date
      let isBeforeMax = this.isBeforeMax(this.endDate, this.maxDate);
      if (!isBeforeMax && control.value != '')
        return { maxDate: { valid: false } };

      // Check the dates are equal or one day apart
      if (this.isValid(this.endDate) && this.isValid(this.startDate)) {
        let isCrossValid = this.isEqualOrAfter(this.endDate, this.startDate);
        if (!isCrossValid) return { default: { valid: false } };
      }

      // Update start date validity
      let startDate = this.form.get(this.startDateControlName);
      if (startDate) {
        !equal &&
          (startDate.value != '' && startDate.setValue(startDate.value));
      }
    };
  }
}
