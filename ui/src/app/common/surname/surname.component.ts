import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'surname',
  templateUrl: './surname.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SurnameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: SurnameComponent, multi: true }
  ]
})
export class SurnameComponent extends BaseComponent implements OnInit {
  //config set up
  config = {
    id: this.camelize(LABELS.SURNAME),
    label: LABELS.SURNAME,
    maxlength: 40,
    pattern: REGEX.DEFAULT_NAME_FORMAT,
    messages: {
      pattern: MessageBuilder(LABELS.SURNAME, ERROR_MESSAGE_STRINGS.NAME)
    }
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
