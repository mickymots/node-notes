import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class FormService {
  private editable = new ReplaySubject<any>();
  private visible = new ReplaySubject<any>();
  editableAnnounced$ = this.editable.asObservable();
  visibleAnnounced$ = this.visible.asObservable();

  /**
   * Allows form fields to be editable
   * @param editable
   */
  setEditable(editable: boolean) {
    this.editable.next(editable);
  }

  /**
   * Used to se the visibility of the form
   * Useful for resetting forms
   * @param visible
   */
  setVisible(visible: boolean) {
    this.visible.next(visible);
  }

  /**
   * Checks if a FormGroup is valid
   * and triggers/focuses errors if not
   */
  isFormValid(form: FormGroup) {
    if (form.invalid) {
      this.triggerErrors(form);
      this.focusError();
    }
    return form.valid;
  }

  /**
   * Focus on the first invalid field
   */
  focusError() {
    let main = document.getElementById('main');
    let errors = main.getElementsByClassName('form-control ng-invalid');
    if (errors.length == 0) return;
    let e = <HTMLElement>errors[0];
    e.focus();
  }

  /**
   * Trigger errors on a form. Checks for
   * FormGroup, FormArray and any children
   * @param form
   */
  triggerErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        const group = control as FormGroup;
        this.triggerFormGroupErrors(group);
      } else if (control instanceof FormArray) {
        for (let row of control.controls) {
          const group = row as FormGroup;
          this.triggerFormGroupErrors(group);
        }
      } else {
        let ctrl = control as FormControl;
        this.triggerError(ctrl);
      }
    });
  }

  /**
   * Loop through controls in a FormGroup
   * and trigger errors on each control
   * @param group
   */
  triggerFormGroupErrors(group: FormGroup) {
    Object.keys(group.controls).forEach(key => {
      const control = group.get(key) as FormControl;
      this.triggerError(control);
    });
  }

  /**
   * Trigger error on a single FormControl
   * by marking it as dirty & touched
   * @param control
   */
  triggerError(control: FormControl) {
    control.markAsDirty();
    control.markAsTouched();
  }

  /**
   * Adds a class to each input with a size attribute
   */
  setSize() {
    setTimeout(() => {
      let fields = document.querySelectorAll('[size]');
      for (let i = 0; i < fields.length; i++) {
        const size = fields[i].getAttribute('size');
        let inputGroup = fields[i].getElementsByClassName('input-group');
        for (let j = 0; j < inputGroup.length; j++) {
          inputGroup[j].className += ' form-control-' + size;
        }

        if (inputGroup.length === 0) {
          const controls = fields[i].getElementsByClassName('form-control');
          for (let k = 0; k < controls.length; k++) {
            controls[k].className += ' form-control-' + size;
          }
        }
      }
    }, 0);
  }
}
