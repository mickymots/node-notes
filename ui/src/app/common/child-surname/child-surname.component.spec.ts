import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ChildSurnameComponent } from './child-surname.component';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ChildSurnameComponent', () => {
  let component: ChildSurnameComponent;
  let fixture: ComponentFixture<ChildSurnameComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildSurnameComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSurnameComponent);
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
    expect(el.textContent).toContain('Child Surname');
  }));

  it('should display the user defined label', fakeAsync(() => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
     console.dir("Element 3 = "+el);
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
    updateForm("text");
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('input'));
    expect(query.componentInstance.childControl._value).toBe("text");
  }));
  
});
