import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnComponent } from './trn.component';

describe('TrnComponent', () => {
  let component: TrnComponent;
  let fixture: ComponentFixture<TrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
