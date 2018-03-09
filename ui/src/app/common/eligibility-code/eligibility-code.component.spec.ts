import { EligibilityCodeComponent } from './eligibility-code.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


describe('EligibilityCodeComponent', () => {
  let component: EligibilityCodeComponent;
  let fixture: ComponentFixture<EligibilityCodeComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EligibilityCodeComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
    })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityCodeComponent);
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
    expect(el.textContent).toContain("Eligibility Code");
  });

});
