import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';
import { REGEX } from './../../base/regex';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'middlename',
  templateUrl: './middlename.component.html',

  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MiddlenameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: MiddlenameComponent, multi: true }
  ]
})
export class MiddlenameComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.MIDDLENAME),
    label: LABELS.MIDDLENAME,
    maxlength: 26,
    pattern: REGEX.DEFAULT_NAME_FORMAT,
    messages: {
      pattern: MessageBuilder(LABELS.MIDDLENAME, ERROR_MESSAGE_STRINGS.NAME)
    }
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
