import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component'
import { Injector } from '@angular/core';

export class BaseGroupComponent extends BaseComponent {

    public formGroup: FormGroup;

    constructor(_injector: Injector) {
        super(_injector);
    }
  
    writeValue(value: any) {
        if (value) {
            this.formGroup.setValue(value);
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this.formGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this.formGroup.disable({ onlySelf: isDisabled, emitEvent: false })
    }

}