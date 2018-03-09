import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberComponent } from './phone-number.component';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumberComponent;
  let fixture: ComponentFixture<PhoneNumberComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberComponent);
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
    expect(el.textContent).toContain('Phone Number');
  });

  it('should display the user defined label', () => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  });
});
