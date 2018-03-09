import {
  Component,
  Input,
  OnInit,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'app-insert-button',
  templateUrl: './insert-button.component.html',
  styleUrls: ['./insert-button.component.scss']
})
export class InsertButtonComponent extends BaseComponent {
  @Input() routerLink;
  @Output() onInsert: EventEmitter<string> = new EventEmitter<string>();

  constructor(_injector: Injector) {
    super(_injector);
  }

  insertEvent() {
    this.onInsert.emit('');
  }
}
