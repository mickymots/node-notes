import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cancel-save-action',
  templateUrl: './cancel-save-action.component.html',
  styleUrls: ['./cancel-save-action.component.scss']
})
export class CancelSaveActionComponent implements OnInit {

 
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  cancelButtonClick() {
    this.onCancel.emit('');
  }

  saveButtonClick() {
    this.onSave.emit('');
  }
}
