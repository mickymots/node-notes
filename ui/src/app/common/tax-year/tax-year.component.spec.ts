import { TaxYearComponent } from './tax-year.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('RelationshiptoChildComponent', () => {
  let component: TaxYearComponent;
  let fixture: ComponentFixture<TaxYearComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxYearComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxYearComponent);
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
    expect(el.textContent).toContain("Tax Year");
  });

   it('should return the current year if current date is after 6 april',() =>{
     component.currentDate = new Date(2017,7,13);
     component.ngOnInit();
     expect(component.data[0].id).toEqual(component.currentDate.getFullYear());
     expect(component.data[0].values).toEqual('2017/18');
  });

   it('should return the previous year if current date is before 6 april',() =>{
     component.currentDate = new Date(2017,1,13);
     component.ngOnInit();
     expect(component.data[0].id).toEqual(component.currentDate.getFullYear()-1);
     expect(component.data[0].values).toEqual('2016/17');
   });

});
