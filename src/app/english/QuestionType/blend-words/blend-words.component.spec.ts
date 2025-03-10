import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendWordsComponent } from './blend-words.component';

describe('BlendWordsComponent', () => {
  let component: BlendWordsComponent;
  let fixture: ComponentFixture<BlendWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlendWordsComponent]
    });
    fixture = TestBed.createComponent(BlendWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
