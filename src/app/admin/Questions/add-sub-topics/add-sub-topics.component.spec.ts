import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTopicsComponent } from './add-sub-topics.component';

describe('AddSubTopicsComponent', () => {
  let component: AddSubTopicsComponent;
  let fixture: ComponentFixture<AddSubTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubTopicsComponent]
    });
    fixture = TestBed.createComponent(AddSubTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
