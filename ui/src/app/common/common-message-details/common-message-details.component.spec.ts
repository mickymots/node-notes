import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { REGEX } from '@itmp/ui';

import { MessageDetailsComponent } from './message-details.component';

describe('MessageDetailsComponent', () => {
  let component: MessageDetailsComponent;
  let fixture: ComponentFixture<MessageDetailsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageDetailsComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(value: any) {
    component.writeValue(value);
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default label', () => {
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Message Details');
  });

  it('should display the user defined label', () => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  });

  it('should use default form-control css class if user has not defined any ', () => {
    component.writeValue(true);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('form-control');
  });

  it('should use user-defined css class if specified ', () => {
    component.writeValue(true);
    component.cssClass = 'custom-form-control'
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-form-control');
  });

  it('should use user-defined css class if specified ', () => {
    component.writeValue(true);
    component.cssClass = 'custom-form-control'
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-form-control');
  });

  it('check the valid value', () => {
    component.regEx = REGEX.TFC_APPLICANT_MESSAGING
    component.writeValue("ABC123");
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    expect(de.nativeElement.value).toContain("ABC123");
  });

  it('check the invalid value', () => {
    component.regEx = REGEX.TFC_APPLICANT_MESSAGING
    component.writeValue("*[]");
    component.label = "Subject"
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('small'));
    el = de.nativeElement;
    expect(el.textContent).toContain("The following characters '[',']','*' are invalid in the Subject field");
  });

});
