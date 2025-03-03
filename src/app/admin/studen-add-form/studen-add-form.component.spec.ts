import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenAddFormComponent } from './studen-add-form.component';

describe('StudenAddFormComponent', () => {
  let component: StudenAddFormComponent;
  let fixture: ComponentFixture<StudenAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudenAddFormComponent]
    });
    fixture = TestBed.createComponent(StudenAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
