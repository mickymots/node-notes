import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseNarativeComponent } from './response-narative.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TfcResponseNarativeComponent', () => {
  let component: ResponseNarativeComponent;
  let fixture: ComponentFixture<ResponseNarativeComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseNarativeComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseNarativeComponent);
    component = fixture.debugElement.componentInstance;
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the default label', () => {

    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Response Narrative");
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

    component.maxlength = 4
    component.writeValue("ABCD")
    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('input'));

    expect(de.nativeElement.value).toContain("ABCD");
  });

  it('check the Invalid value', () => {
    component.maxlength = 4

    component.writeValue("AB12345CD435345345345345345@")
    //component.label = "invalid value"
    component.ngOnInit();
    fixture.detectChanges();
    // query for the bale by CSS element selector
    de = fixture.debugElement.query(By.css('small'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Response Narrative exceeds maximum length of 4");
  });


});

