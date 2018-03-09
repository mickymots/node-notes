import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtrComponent } from './utr.component';

describe('UtrComponent', () => {
  let component: UtrComponent;
  let fixture: ComponentFixture<UtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
