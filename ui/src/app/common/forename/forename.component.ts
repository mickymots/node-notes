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
  selector: 'forename',
  templateUrl: './forename.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ForenameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: ForenameComponent, multi: true }
  ]
})
export class ForenameComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.FORENAME),
    label: LABELS.FORENAME,
    maxlength: 26,
    pattern: REGEX.DEFAULT_NAME_FORMAT,
    messages: {
      pattern: MessageBuilder(LABELS.FORENAME, ERROR_MESSAGE_STRINGS.NAME)
    }
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
