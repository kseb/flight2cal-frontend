import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportpickerComponent } from './airportpicker.component';

describe('AirportpickerComponent', () => {
  let component: AirportpickerComponent;
  let fixture: ComponentFixture<AirportpickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirportpickerComponent]
    });
    fixture = TestBed.createComponent(AirportpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
