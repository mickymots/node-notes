import { RelationshiptoChildComponent } from './relationship-to-child.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('RelationshiptoChildComponent', () => {
  let component: RelationshiptoChildComponent;
  let fixture: ComponentFixture<RelationshiptoChildComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelationshiptoChildComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshiptoChildComponent);
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
    expect(el.textContent).toContain("Relationship to Child");
  });

});
