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
  selector: 'trn',
  templateUrl: './trn.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrnComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: TrnComponent, multi: true }
  ]
})
export class TrnComponent extends BaseComponent implements OnInit {
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
      id: this.camelize(LABELS.TRN),
      label: this.label || LABELS.TRN,
      pattern: REGEX.TRN,
      maxlength: 9,
      minlength: 8,
      messages: {
        pattern: MessageBuilder(this.label, ERROR_MESSAGE_STRINGS.TRN)
      }
    };
  }
}
