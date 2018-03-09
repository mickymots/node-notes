import {
  Component,
  Input,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent extends BaseComponent {
  @Input() msg: string;

  constructor(_injector: Injector) {
    super(_injector);
  }
}
