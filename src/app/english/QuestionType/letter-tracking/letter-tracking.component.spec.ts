import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTrackingComponent } from './letter-tracking.component';

describe('LetterTrackingComponent', () => {
  let component: LetterTrackingComponent;
  let fixture: ComponentFixture<LetterTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetterTrackingComponent]
    });
    fixture = TestBed.createComponent(LetterTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
