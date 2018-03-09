import { Component, Input, OnInit, Injector } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';
import { REGEX } from './../../base/regex';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'common-message-details',
  templateUrl: './common-message-details.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CommonMessageDetailsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CommonMessageDetailsComponent,
      multi: true
    }
  ]
})
export class CommonMessageDetailsComponent extends BaseComponent
  implements Validator, OnInit {
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup({
      id: LABELS.TFC_MESSAGE_DETAILS,
      label: LABELS.TFC_MESSAGE_DETAILS,
      pattern: REGEX.TFC_APPLICANT_MESSAGING,
      maxlength: 2896,
      messages: {
        pattern: ERROR_MESSAGE_STRINGS.FREE_TEXT
      }
    });
  }
}
