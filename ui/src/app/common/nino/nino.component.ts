import { 
  Component,
  OnInit,
  Input,
  Injector,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';
import { REGEX } from './../../base/regex';
import { ComponentConfig } from './../../base/component-config';
import {
  ERROR_MESSAGE_STRINGS,
  MessageBuilder
} from './../../base/error-message';

@Component({
  selector: 'nino',
  templateUrl: './nino.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NinoComponent),
      multi: true 
    },
    { provide: NG_VALIDATORS, useExisting: NinoComponent, multi: true }
  ]
})
export class NinoComponent extends BaseComponent implements OnInit {
  @Input() nino: String;

  private config: ComponentConfig;

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setConfig();
    this.setup(this.config);
  }

  setConfig(){
    this.config = {
      id: this.camelize(LABELS.NINO),
      label: this.label || LABELS.NINO,
      pattern: REGEX.NINO,
      maxlength: 9,
      minlength: 8,
      messages: {
        pattern: MessageBuilder(
          this.label || LABELS.NINO,
          ERROR_MESSAGE_STRINGS.NINO
        )
      }
    };
  }
}
