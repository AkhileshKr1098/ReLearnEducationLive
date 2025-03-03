import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekByPageComponent } from './week-by-page.component';

describe('WeekByPageComponent', () => {
  let component: WeekByPageComponent;
  let fixture: ComponentFixture<WeekByPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekByPageComponent]
    });
    fixture = TestBed.createComponent(WeekByPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
