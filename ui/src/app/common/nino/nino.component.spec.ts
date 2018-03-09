import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NinoComponent } from './nino.component';

describe('NinoComponent', () => {
  let component: NinoComponent;
  let fixture: ComponentFixture<NinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
