import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicsComponent } from './add-topics.component';

describe('AddTopicsComponent', () => {
  let component: AddTopicsComponent;
  let fixture: ComponentFixture<AddTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTopicsComponent]
    });
    fixture = TestBed.createComponent(AddTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
