/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubheadingComponent } from './subheading.component';

describe('SubheadingComponent', () => {
  let component: SubheadingComponent;
  let fixture: ComponentFixture<SubheadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubheadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubheadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
