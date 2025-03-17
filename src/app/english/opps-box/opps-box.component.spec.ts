import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppsBoxComponent } from './opps-box.component';

describe('OppsBoxComponent', () => {
  let component: OppsBoxComponent;
  let fixture: ComponentFixture<OppsBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OppsBoxComponent]
    });
    fixture = TestBed.createComponent(OppsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
