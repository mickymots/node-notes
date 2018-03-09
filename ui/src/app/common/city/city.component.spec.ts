import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityComponent } from './city.component';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityComponent ],
       imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default label', () => {
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('City');
  });

  it('should display the user defined label', () => {
    component.label = 'Custom label';
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Custom label');
  });
});
