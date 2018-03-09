import { LABELS } from './../../base/labels';
import {
  Component,
  OnInit,
  forwardRef,
  Input,
  OnChanges,
  Injector,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'tax-year',
  template: ` <div class="form-group">
    <label for="tax-year" class="control-label">{{label}}</label>
        <ng-select
            [items] = "data"
            [active] = "active"
            (selected)="selectTaxYears($event)">
        </ng-select>
        <app-error-msg [msg]="errorMessage"></app-error-msg>
  div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaxYearComponent),
      multi: true
    }
  ]
})
export class TaxYearComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.TAX_YEAR),
    label: LABELS.TAX_YEAR,
    required: true
  };

  @Input() selectedDate: any;

  public data: any;
  public currentDate: Date;
  private tempDate: Date;
  private startTaxYear: number = 2001;
  public active = [];

  @Output() change = new EventEmitter();

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.populateTaxYearData();
  }

  populateTaxYearData() {
    this.currentDate = new Date();
    let currentYear = this.currentDate.getFullYear();
    this.tempDate = new Date(this.currentDate.getFullYear(), 3, 6);
    let arr = [];

    if (this.currentDate >= this.tempDate) {
      this.calculateYears(arr, currentYear, currentYear + 1);
    } else {
      this.calculateYears(arr, currentYear - 1, currentYear);
    }

    this.data = arr;

    let i = this.data.length;
    while (i--) {
      if (this.selectedDate == this.data[i].id) {
        this.active.push({ id: this.data[i].id, text: this.data[i].text });
      }
    }
  }

  private calculateYears(arr: any, year1: any, year2: any) {
    for (let i = year1; i >= this.startTaxYear; i--) {
      arr.push({ id: i + 1, text: i + '/' + (i + 1).toString().substr(2, 2) });
    }
  }

  public selectTaxYears(value: any): void {
    this.change.emit(value);
  }
}
