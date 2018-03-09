import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent implements OnInit {
  @Input() resetRequired : boolean
  @Output() onExpand: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCollapse: EventEmitter<string> = new EventEmitter<string>();
  @Output() onReset: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  emitExpand() {
    this.onExpand.emit('');
  }

  emitCollapse() {
    this.onCollapse.emit('');
  }

  emitReset() {
    this.onReset.emit('');
  }
}
