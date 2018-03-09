import {
  Component,
  OnInit,
  forwardRef,
  Input,
  OnChanges,
  Injector
} from '@angular/core';
import {
  FormControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { MessageService, ReferenceDataService } from '@itmp/arch';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'address-type',
  templateUrl: `./address-type.component.html`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressTypeComponent),
      multi: true
    }
  ]
})
export class AddressTypeComponent extends BaseComponent implements OnInit {
  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }

  ngOnInit() {
    if (this.options == undefined) {
      this.getAddressType();
    }

    this.label = this.label ? this.label : 'Address Type';
    let validations = [];

    this.required ? validations.push(Validators.required) : false;
    this.childControl.setValidators(validations);
  }

  getAddressType() {
    let responseList = this.referenceDataService
      .getRefData('ADD_TYPE_')
      .subscribe(result => {
        this.options = result;
      });
  }
}
