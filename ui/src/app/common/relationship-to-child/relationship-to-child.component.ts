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
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'relationship-to-child',
  template: ` <div class="form-group">
    <label for="relationship-to-child" class="control-label">{{label}}</label>
     <select name="relationship-to-child" [class]="cssClass || 'form-control'"  [formControl]="childControl" [required]="required">
          <option value="">Please Select...</option>
          <option *ngFor="let item of options" value="{{ item.id }}">{{ item.values }}</option>
     </select>       
     <app-error-msg [msg]="errorMessage"></app-error-msg>
</div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RelationshiptoChildComponent),
      multi: true
    }
  ]
})
export class RelationshiptoChildComponent extends BaseComponent
  implements OnInit {
  /*constructor(public referenceDataService: ReferenceDataService) {
    super();

  }*/
  constructor(private http: Http, _injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    if (this.options == undefined) {
      this.getEligibilityResponse().subscribe(response => {
        this.options = response;
      });
    }

    this.label = this.label ? this.label : 'Relationship to Child';
    let validations = [];

    this.required ? validations.push(Validators.required) : false;
    this.childControl.setValidators(validations);
  }

  getEligibilityResponse(): Observable<String[]> {
    /* let responseList = this.referenceDataService.getRefData("APPLICATION_").subscribe(result => {
       this.data = result;
     });*/
    return this.http.get('/app/heroes').map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
}
