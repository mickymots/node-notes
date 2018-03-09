import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateComponent } from './../date/date.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { VALIDATOR_FUNCTIONS } from './../../base/validator-functions';
import { ERROR_MESSAGE_STRINGS, MessageBuilder } from './../../base/error-message';
import { ComponentConfig } from '../../base/component-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';

import { DateOfBirthComponent } from './date-of-birth.component';

describe('DateOfBirthComponent', () => {
  let component: DateOfBirthComponent;
  let fixture: ComponentFixture<DateOfBirthComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateOfBirthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateOfBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default label', () => {
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain(LABELS.DATE_OF_BIRTH);
  });

  it('should display the user defined label', () => {
    component.label = LABELS.DATE_OF_BIRTH;
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Date Of Birth');
  });

  it('should update value changes', () => {
    component.writeValue("01/01/2017");
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('input'));
    expect(query.componentInstance.childControl._value).toBe("01/01/2017");
  });

});
