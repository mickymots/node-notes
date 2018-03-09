import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditButtonComponent } from './table-edit-button.component';

describe('TableEditButtonComponent', () => {
  let component: TableEditButtonComponent;
  let fixture: ComponentFixture<TableEditButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEditButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
