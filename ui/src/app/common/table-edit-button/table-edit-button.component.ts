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
  selector: 'app-table-edit-button',
  templateUrl: './table-edit-button.component.html',
  styleUrls: ['./table-edit-button.component.scss']
})
export class TableEditButtonComponent extends BaseComponent {
  @Input() routerLink;
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor(_injector: Injector) {
    super(_injector);
  }

  editTableRowEvent() {
    this.onEdit.emit('');
  }
}
