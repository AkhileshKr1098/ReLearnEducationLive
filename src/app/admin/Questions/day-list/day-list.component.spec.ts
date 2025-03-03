import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListComponent } from './day-list.component';

describe('DayListComponent', () => {
  let component: DayListComponent;
  let fixture: ComponentFixture<DayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayListComponent]
    });
    fixture = TestBed.createComponent(DayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
