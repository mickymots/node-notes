import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AlternateSequenceNoComponent } from './alternate-sequence-no.component';
import { FormControl, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AlternateSequenceNoComponent', () => {
  let component: AlternateSequenceNoComponent;
  let fixture: ComponentFixture<AlternateSequenceNoComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlternateSequenceNoComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NG_VALIDATORS,
          useExisting: AlternateSequenceNoComponent,
          multi: true
        }
      ]
    });
    fixture = TestBed.createComponent(AlternateSequenceNoComponent);
    component = fixture.debugElement.componentInstance;

  }));
  function updateForm(value: any) {
    component.writeValue(value);
  }
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
  it('should display the default label', fakeAsync(() => {
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Alternate Sequence Number');
  }));
  it('should display the user defined label', fakeAsync(() => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  }));
  it('should use default form-control css class if user has not defined any ', fakeAsync(() => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('form-control');
  }));
  it('should use user-defined css class if specified ', fakeAsync(() => {
    component.cssClass = 'custom-form-control'
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-form-control');
  }));
  it('should update value changes', fakeAsync(() => {
    updateForm("ABC1234");
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('input'));
    expect(query.componentInstance.childControl._value).toBe("ABC1234");
  }));
  it('should call register on change of component value', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('input'));
    query.componentInstance.childControl._value = "A123456";
    fixture.detectChanges();
    expect(component.registerOnChange).toHaveBeenCalled;
  }));
  it('should update form status to be invalid if validation failed', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('input'));
    query.componentInstance.childControl._value = "ABC$%";
    fixture.detectChanges();
    expect(query.componentInstance.childControl.status).toBe("INVALID");
  }));
  it('should update form status to be valid if validation succeeds', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('input'));
    query.componentInstance.childControl = new FormControl('', Validators.maxLength(5));
    query.componentInstance.childControl._value = "12345";
    fixture.detectChanges();
    expect(query.componentInstance.childControl.status).toBe("VALID");
  }));
});
