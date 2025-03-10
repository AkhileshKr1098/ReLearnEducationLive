import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCQComponent } from './mcq.component';

describe('MCQComponent', () => {
  let component: MCQComponent;
  let fixture: ComponentFixture<MCQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MCQComponent]
    });
    fixture = TestBed.createComponent(MCQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
