import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppDateGroupComponent } from './app-date-group.component';
import { AppDateComponent } from './../../Common/app-date/app-date.component';

describe('AppDateGroupComponent', () => {
  let component: AppDateGroupComponent;
  let fixture: ComponentFixture<AppDateGroupComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppDateGroupComponent, AppDateComponent],
        imports: [ReactiveFormsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user defined label', () => {
    component.startDateLabel = 'TFC Eligibility Start Date';
    component.endDateLabel = 'TFC Eligibility End Date';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();

    expect(el.textContent).toContain('TFC Eligibility Start Date');
    expect(el.textContent).toContain('TFC Eligibility End Date');
  });

  it('should be disabled', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    component.dateFormGroup.disable();
    expect(component.isDisabled).toBe(true);
  });

  it('should have default values', () => {
    component.startDateLabel = 'TFC Eligibility Start Date';
    component.endDateLabel = 'TFC Eligibility End Date';
    let date: Date = new Date();
    let tfc = {
      startDate: date,
      endDate: date
    };
    component.writeValue(tfc);
    component.dateFormGroup.disable();
    fixture.detectChanges();
    let query = fixture.debugElement.query(By.css('input'));
    expect(query.componentInstance.childControl._value).toBe(date);
  });
});
