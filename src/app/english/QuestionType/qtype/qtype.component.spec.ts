import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QTypeComponent } from './qtype.component';

describe('QTypeComponent', () => {
  let component: QTypeComponent;
  let fixture: ComponentFixture<QTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QTypeComponent]
    });
    fixture = TestBed.createComponent(QTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
