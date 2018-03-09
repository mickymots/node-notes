import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ChildDOBDateComponent } from './child-dob-date.component';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('ChildDOBDateComponent', () => {
  let component: ChildDOBDateComponent;
  let fixture: ComponentFixture<ChildDOBDateComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDOBDateComponent ],
      imports: [ReactiveFormsModule,CalendarModule,BrowserAnimationsModule,NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDOBDateComponent);
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
    expect(el.textContent).toContain('Child DOB Date');
  }));

  it('should display the user defined label', fakeAsync(() => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  }));

});
