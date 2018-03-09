import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlcrefComponent } from './slcref.component';

describe('SlcrefComponent', () => {
  let component: SlcrefComponent;
  let fixture: ComponentFixture<SlcrefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlcrefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlcrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
