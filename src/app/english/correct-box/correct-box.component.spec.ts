import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectBoxComponent } from './correct-box.component';

describe('CorrectBoxComponent', () => {
  let component: CorrectBoxComponent;
  let fixture: ComponentFixture<CorrectBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectBoxComponent]
    });
    fixture = TestBed.createComponent(CorrectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
