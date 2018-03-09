import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CRNComponent } from './crn.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TfcCrnComponent', () => {
  let component: CRNComponent;
  let fixture: ComponentFixture<CRNComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CRNComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('check the default label', () => {

    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Child Reference Number");
  });


  it('check the custom label', () => {

    component.label = "custom label"
    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
    expect(el.textContent).toContain("custom label");
  });

  it('check the valid value', () => {

    component.regEx = /"^([^0-9@]*)$"/
    component.writeValue("ABCD")
    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('input'));

    expect(de.nativeElement.value).toContain("ABCD");
  });

  it('check the Invalid value', () => {

    component.regEx = /"^([^0-9@]*)$"/
    component.writeValue("ABCD@")
    component.label = "invalid value"

    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('small'));
    el = de.nativeElement;
    expect(el.textContent).toContain("invalid value has errors");
  });

  it('check the Invalid value with custom error message', () => {

    component.regEx = /"^([^0-9@]*)$"/
    component.writeValue("ABCD1234@");
    component.customErrorMessage = "custom error message";

    component.ngOnInit();

    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('small'));
    el = de.nativeElement;
    expect(el.textContent).toContain("custom error message");
  });
});
