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
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { ComponentConfig } from './../../base/component-config';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'slcref',
  templateUrl: './slcref.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlcrefComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: SlcrefComponent, multi: true }
  ]
})
export class SlcrefComponent extends BaseComponent implements OnInit {
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
      id: this.camelize(LABELS.SLCREF),
      label: this.label || LABELS.SLCREF,
      pattern: REGEX.SLCREF_FORMAT,
      maxlength: 11,
      minlength: 0,
      messages: {
        pattern: MessageBuilder(this.label, ERROR_MESSAGE_STRINGS.SLCREF)
      }
    };
  }
}
