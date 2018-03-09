import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertButtonComponent } from './insert-button.component';

describe('InsertButtonComponent', () => {
  let component: InsertButtonComponent;
  let fixture: ComponentFixture<InsertButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
