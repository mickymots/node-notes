import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-date-group',
  styles: ['.mat-input-underline {height:0px !important}'],
  templateUrl: `./app-date-group.component.html`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDateGroupComponent),
      multi: true
    }
  ]
})
export class AppDateGroupComponent implements ControlValueAccessor, OnInit {
  @Input() startDateLabel: string;
  @Input() endDateLabel: string;
  @Input() isDisabled: boolean;
  @Input() startDateIdRef: string;
  @Input() endDateIdRef: string;
  @Input() readonly: string;
  dateFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.dateFormGroup = this.fb.group({
      startDate: [{ value: '', disabled: this.isDisabled }],
      endDate: [{ value: '', disabled: this.isDisabled }]
    });
  }
  writeValue(value: any) {
    if (value) {
      this.dateFormGroup.setValue(value);
    }
  }
  registerOnChange(fn: (value: any) => void) {
    this.dateFormGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched() {}
  setDisabledState(isDisabled: boolean): void {
    this.dateFormGroup.disable({ onlySelf: isDisabled, emitEvent: false });
  }
}
