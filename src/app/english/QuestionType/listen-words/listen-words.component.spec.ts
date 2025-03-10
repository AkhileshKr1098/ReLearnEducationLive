import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenWordsComponent } from './listen-words.component';

describe('ListenWordsComponent', () => {
  let component: ListenWordsComponent;
  let fixture: ComponentFixture<ListenWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListenWordsComponent]
    });
    fixture = TestBed.createComponent(ListenWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
