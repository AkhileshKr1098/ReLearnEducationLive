import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTopicsListComponent } from './sub-topics-list.component';

describe('SubTopicsListComponent', () => {
  let component: SubTopicsListComponent;
  let fixture: ComponentFixture<SubTopicsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTopicsListComponent]
    });
    fixture = TestBed.createComponent(SubTopicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
