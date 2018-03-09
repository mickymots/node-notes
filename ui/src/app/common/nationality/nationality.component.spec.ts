import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NationalityComponent } from './nationality.component';
import { FormControl, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NationalityComponent', () => {
  let component: NationalityComponent;
  let fixture: ComponentFixture<NationalityComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NationalityComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NG_VALIDATORS,
          useExisting: NationalityComponent,
          multi: true
        }
      ]
    });
    fixture = TestBed.createComponent(NationalityComponent);
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
    expect(el.textContent).toContain('Nationality');
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
    de = fixture.debugElement.query(By.css('select'));
    el = de.nativeElement;
    expect(el.className).toContain('form-control');
  }));
  it('should use user-defined css class if specified ', fakeAsync(() => {
    component.cssClass = 'custom-form-control';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('select'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-form-control');
  }));
  it('should update value changes', fakeAsync(() => {
    updateForm("Israeli");
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('select'));
    expect(query.componentInstance.childControl._value).toBe("Israeli");
  }));
  it('should call register on change of component value', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('select'));
    query.componentInstance.childControl._value = "Japanese";
    fixture.detectChanges();
    expect(component.registerOnChange).toHaveBeenCalled;
  }));
});
