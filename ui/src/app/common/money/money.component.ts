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
import { ComponentConfig } from './../../base/component-config';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MoneyComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MoneyComponent,
      multi: true
    }
  ]
})
export class MoneyComponent extends BaseComponent implements OnInit {
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
      id: this.camelize(LABELS.MONEY),
      label: LABELS.MONEY,
      pattern: REGEX.MONEY,
      messages: {
        pattern: MessageBuilder(this.label, ERROR_MESSAGE_STRINGS.MONEY)
      }
    };
  }
}
