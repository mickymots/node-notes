import { Component, ElementRef, OnInit, Input, Injector } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormGroup
} from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { ComponentConfig } from '../../base/component-config';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: DateComponent, multi: true }
  ]
})
export class DateComponent extends BaseComponent implements OnInit {
  @Input() config: ComponentConfig;
  @Input() form: FormGroup;
  @Input() formControlName: string;
  @Input() format = 'DD/MM/YYYY';
  @Input() minDate: Date = moment('01/01/1900', 'DD/MM/YYYY').toDate();
  @Input() maxDate: Date = moment('01/01/2078', 'DD/MM/YYYY').toDate();
  @Input() activeDate: Date;
  @Input() disabled: boolean;
  @Input() hidepicker = false;

  constructor(_injector: Injector, public _eref: ElementRef) {
    super(_injector);
  }

  ngOnInit() {
    if (this.config) {
      this.setup(this.config);
      this.watchChanges();
    }
  }

  setDate(event) {
    const date = moment(event.target.value).format('DD/MM/YYYY');
    this.writeValue(date);
  }

  watchChanges() {
    this.childControl.valueChanges.subscribe(res => {
      const date = moment(res, 'DD/MM/YYYY').toDate();
      this.setActiveDate(date);
    });
  }

  setActiveDate(activeDate: Date) {
    this.activeDate = activeDate;
  }

  /**
   * Check if valid date
   * @param date
   */
  isValid(date: Date): boolean {
    return moment(date).isValid();
  }

  /**
   * Check if past date
   * @param date
   */
  isPast(date: Date): boolean {
    return moment(date).isBefore(moment());
  }

  /**
   * Check if future date
   * @param date
   */
  isFuture(date: Date): boolean {
    return moment(date).isAfter(moment());
  }

  /**
   * Check if date is before a certain date
   * @param input 
   * @param comparison 
   */
  isBefore(input: Date, comparison: Date): boolean {
    return moment(input).isBefore(comparison);
  }

  /**
   * Check if date is after a certain date
   * @param input 
   * @param comparison 
   */
  isAfter(input: Date, comparison: Date): boolean {
    return moment(input).isAfter(comparison);
  }

  /**
   * Check if dates are equal
   * @param input
   * @param comparison 
   */
  isEqual(input: Date, comparison: Date): boolean {
    return moment(input).isSame(comparison);
  }

  /**
   * Check if date is equal or before a certain date
   * @param input 
   * @param comparison 
   */
  isEqualOrBefore(input: Date, comparison: Date): boolean {
    return moment(input).isSameOrBefore(comparison);
  }

  /**
   * Check if date is equal or before a certain date
   * @param input 
   * @param comparison 
   */
  isEqualOrAfter(input: Date, comparison: Date): boolean {
    return moment(input).isSameOrAfter(comparison);
  }

  /**
   * Is after mininum date
   * @param endDate
   */
  isAfterMin(date: Date, minDate: Date): boolean {
    return this.isAfter(
      date,
      moment(minDate)
        .subtract(1, 'days')
        .toDate()
    );
  }

  /**
   * Is before max date
   * @param date 
   */
  isBeforeMax(date: Date, maxDate: Date): boolean {
    return this.isBefore(
      date,
      moment(maxDate)
        .add(1, 'days')
        .toDate()
    );
  }
}
