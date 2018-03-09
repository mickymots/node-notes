import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FullNameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: FullNameComponent, multi: true }
  ]
})
export class FullNameComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.FORENAME),
    label: LABELS.FORENAME,
    maxlength: 299,
    pattern: REGEX.DEFAULT_NAME_FORMAT,
    messages: {
      pattern: ERROR_MESSAGE_STRINGS.NAME
    }
  };
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
