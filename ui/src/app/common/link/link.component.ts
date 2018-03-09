import { Component, Input, OnInit, Injector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';
import { ReferenceDataService, ReferenceDataType } from '@itmp/arch';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LinkComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: LinkComponent,
      multi: true
    }
  ]
})
export class LinkComponent extends BaseComponent implements OnInit {
  @Input() pageID;
  isDormant = false;

  config = {
    id: this.camelize(LABELS.LINK),
    label: LABELS.LINK
  };

  constructor(
    _injector: Injector,
    private refDataService: ReferenceDataService
  ) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.setDormantFlag();
  }

  private setDormantFlag() {
    this.refDataService
      .getRefData(ReferenceDataType.DORMANT_TYPE)
      .subscribe(dormantList => {
        this.isDormant = dormantList.some(element => {
          return element.values.includes(this.pageID);
        });
      });
  }
}
