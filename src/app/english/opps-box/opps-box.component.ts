import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-opps-box',
  templateUrl: './opps-box.component.html',
  styleUrls: ['./opps-box.component.scss']
})
export class OppsBoxComponent {

  constructor(public dialogRef: MatDialogRef<OppsBoxComponent>) { }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }
}
