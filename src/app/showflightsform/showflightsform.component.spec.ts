import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowflightsformComponent } from './showflightsform.component';

describe('ShowflightsformComponent', () => {
  let component: ShowflightsformComponent;
  let fixture: ComponentFixture<ShowflightsformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowflightsformComponent]
    });
    fixture = TestBed.createComponent(ShowflightsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
