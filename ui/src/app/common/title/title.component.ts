import { Component, OnInit, Input, Injector } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  Validators,
  FormGroup
} from '@angular/forms';
import { ReferenceDataService } from '@itmp/arch';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'title-group',
  templateUrl: './title.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TitleComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: TitleComponent, multi: true }
  ]
})
export class TitleComponent extends BaseComponent implements OnInit, Validator {
  public config = {
    id: this.camelize(LABELS.TITLE),
    label: LABELS.TITLE
  };

  options = [];
  childControl = new FormControl('');

  constructor(
    private referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.setupValidation();
    this.getTitles();
  }

  getTitles() {
    this.referenceDataService.getRefData('TITLE___').subscribe(
      result => {
        this.options = result;
      },
      err => {
        throw err;
      }
    );
  }

  setupValidation() {
    let validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    this.childControl.setValidators(validations);
  }
}
