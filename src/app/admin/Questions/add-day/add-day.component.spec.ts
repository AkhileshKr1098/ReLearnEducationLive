import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayComponent } from './add-day.component';

describe('AddDayComponent', () => {
  let component: AddDayComponent;
  let fixture: ComponentFixture<AddDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDayComponent]
    });
    fixture = TestBed.createComponent(AddDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
