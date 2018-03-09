import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ResponseTopUpNumberComponent } from './response-top-up-number.component';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ResponseTopUpNumberComponent', () => {
  let component: ResponseTopUpNumberComponent;
  let fixture: ComponentFixture<ResponseTopUpNumberComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseTopUpNumberComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTopUpNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(value: any) {
    component.writeValue(value);
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

   it('should display the default label', fakeAsync(() => {
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Response Top-Up Number');
  }));

  it('should display the user defined label', fakeAsync(() => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  }));


  it('should use default form-control css class if user has not defined any ', fakeAsync(() => {
    component.writeValue(true);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('form-control');
  }));


   it('should use user-defined css class if specified ', fakeAsync(() => {
    component.writeValue(true);
    component.cssClass='custom-form-control'
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-form-control');
  }));


  it('should update value changes', fakeAsync(() => {
    updateForm(true);
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('input'));
    expect(query.componentInstance.childControl._value).toBe(true);
  }));


  it('should call register on change of component value', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('input'));
    query.componentInstance.childControl._value = false;
    query.triggerEventHandler('click', component);
    fixture.detectChanges();
    expect(component.registerOnChange).toHaveBeenCalled;
  }));

});
