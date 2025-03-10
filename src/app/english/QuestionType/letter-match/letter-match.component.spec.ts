import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterMatchComponent } from './letter-match.component';

describe('LetterMatchComponent', () => {
  let component: LetterMatchComponent;
  let fixture: ComponentFixture<LetterMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetterMatchComponent]
    });
    fixture = TestBed.createComponent(LetterMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
