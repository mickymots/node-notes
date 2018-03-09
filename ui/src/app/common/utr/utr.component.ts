import { Component, OnInit, forwardRef, Injector } from '@angular/core';
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
import { ComponentConfig } from './../../base/component-config';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'utr',
  templateUrl: `./utr.component.html`,
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UtrComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: UtrComponent, multi: true }
  ]
})
export class UtrComponent extends BaseComponent implements OnInit {
  private config: ComponentConfig;

 
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setConfig();
    this.setup(this.config);
  }

   setConfig() {
    this.config = {
      id: this.camelize(LABELS.UTR),
      label: this.label || LABELS.UTR,
      pattern: REGEX.UTR_FORMAT,
      maxlength: 10,
      minlength: 10,
      messages: {
        pattern: MessageBuilder(this.label, ERROR_MESSAGE_STRINGS.UTR)
      }
    };
  }
}
