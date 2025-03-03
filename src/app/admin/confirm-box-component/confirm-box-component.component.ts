import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box-component',
  templateUrl: './confirm-box-component.component.html',
  styleUrls: ['./confirm-box-component.component.scss']
})
export class ConfirmBoxComponentComponent {
  data: any = 1
  constructor(
    private dialog: MatDialogRef<ConfirmBoxComponentComponent>
  ) { }
}
