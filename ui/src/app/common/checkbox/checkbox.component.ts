import { Component, Input, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'check-box',
  styleUrls: ['./checkbox.component.scss'],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent extends BaseComponent {
  constructor(_injector: Injector) {
    super(_injector);
  }
}
