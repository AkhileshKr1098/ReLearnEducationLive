import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeekComponent } from './add-week.component';

describe('AddWeekComponent', () => {
  let component: AddWeekComponent;
  let fixture: ComponentFixture<AddWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWeekComponent]
    });
    fixture = TestBed.createComponent(AddWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
