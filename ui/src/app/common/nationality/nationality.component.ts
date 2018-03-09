import { Component, OnInit, Input, Injector } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
  FormGroup
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';
import { REGEX } from './../../base/regex';
import { ReferenceDataService } from '@itmp/arch'; 

@Component({
  selector: 'nationality',
  templateUrl: './nationality.component.html',
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: NationalityComponent,
      multi: true
    }]
})
export class NationalityComponent extends BaseComponent implements OnInit {
  data: any;
  config = {
    id: this.camelize(LABELS.NATIONALITY),
    label: LABELS.NATIONALITY,
    pattern: REGEX.ALPHANUMERIC
  };

  constructor(_injector: Injector,  private referenceDataService: ReferenceDataService) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.getNationalityTypes();
  }

  getNationalityTypes() {
    this.referenceDataService.getRefData('NATNLITY')
      .subscribe(nationality => {
         let arr = [];
        nationality.map(item => {
          arr.push({ id: item.id, values: item.values });
        });
        this.data = arr;
      });
  }
}
