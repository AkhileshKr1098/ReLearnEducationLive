import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsDialogComponent } from './oops-dialog.component';

describe('OopsDialogComponent', () => {
  let component: OopsDialogComponent;
  let fixture: ComponentFixture<OopsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OopsDialogComponent]
    });
    fixture = TestBed.createComponent(OopsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
