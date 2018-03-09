import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MergeStatusComponent } from './merge-status.component';
import { FormControl, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MergeStatusComponent', () => {
  let component: MergeStatusComponent;
  let fixture: ComponentFixture<MergeStatusComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MergeStatusComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NG_VALIDATORS,
          useExisting: MergeStatusComponent,
          multi: true
        }
      ]
    });
    fixture = TestBed.createComponent(MergeStatusComponent);
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
    expect(el.textContent).toContain('Specialist Business Area');
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
    updateForm("Merge_1");
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('select'));
    expect(query.componentInstance.childControl._value).toBe("SBA_1");
  }));
  it('should call register on change of component value', fakeAsync(() => {
    let query = fixture.debugElement.query(By.css('select'));
    query.componentInstance.childControl._value = "Merge_2";
    fixture.detectChanges();
    expect(component.registerOnChange).toHaveBeenCalled;
  }));
});
