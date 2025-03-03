import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenListComponent } from './studen-list.component';

describe('StudenListComponent', () => {
  let component: StudenListComponent;
  let fixture: ComponentFixture<StudenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudenListComponent]
    });
    fixture = TestBed.createComponent(StudenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
