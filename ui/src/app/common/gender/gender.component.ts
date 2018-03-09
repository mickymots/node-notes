import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { ReferenceDataService } from '@itmp/arch';

@Component({
  selector: 'gender',
  templateUrl: './gender.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GenderComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: GenderComponent, multi: true }
  ]
})
export class GenderComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.GENDER),
    label: LABELS.GENDER
  };

  item = [];

  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.getGender();
  }

  getGender() {
    this.referenceDataService.getRefData('GENDER__').subscribe(result => {
      this.item = result;
    });
  }
}
