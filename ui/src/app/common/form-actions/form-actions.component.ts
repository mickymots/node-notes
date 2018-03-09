import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '@itmp/arch';
import { LoggingService } from '@itmp/arch';
import { FormService } from '@itmp/arch';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent implements OnInit {
  public editable: boolean;

  @Input() form: FormGroup;
  @Input() saveRequired: boolean = true;
  @Input() saveDisabled: boolean = false;
  @Input() backRequired: boolean = false;
  @Input() backUrl: string;
  @Input() backIdRef: string;
  @Input() insertRequired: boolean = false;
  @Input() insertDisabled: boolean = false;
  @Input() saveText: string = 'Save';

  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onBack: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  @Output() onInsert: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.getEditable();
  }

  getEditable() {
    this.formService.editableAnnounced$.subscribe(res => {
      this.editable = res;
    });
  }

  toggleEditable() {
    this.editable = !this.editable;
    this.formService.setEditable(this.editable);
  }

  cancelButtonClick() {
    this.toggleEditable();
    this.onCancel.emit('');
  }

  backButtonClick() {
    this.onBack.emit('');
  }

  editButtonClick() {
    this.toggleEditable();
    this.onEdit.emit('');
  }

  saveButtonClick() {
    this.onSave.emit('');
  }

  insertButtonClick() {
    this.onInsert.emit('');
  }
}
