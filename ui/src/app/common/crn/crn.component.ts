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
  selector: 'crn',
  templateUrl: './crn.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CRNComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: CRNComponent, multi: true }
  ]
})
export class CRNComponent extends BaseComponent implements OnInit {
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
      id: this.camelize(LABELS.CRN),
      label: this.label || LABELS.CRN,
      pattern: REGEX.CRN_FORMAT,
      maxlength: 9,
      minlength: 8,
      messages: {
        pattern: MessageBuilder(
          this.label || LABELS.CRN,
          ERROR_MESSAGE_STRINGS.NINO
        )
      }
    };
  }
}
