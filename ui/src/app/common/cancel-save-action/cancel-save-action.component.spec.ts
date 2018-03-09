import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSaveActionComponent } from './cancel-save-action.component';

describe('CancelSaveActionComponent', () => {
  let component: CancelSaveActionComponent;
  let fixture: ComponentFixture<CancelSaveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSaveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSaveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
