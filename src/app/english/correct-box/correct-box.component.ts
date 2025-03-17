import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-correct-box',
  templateUrl: './correct-box.component.html',
  styleUrls: ['./correct-box.component.scss']
})
export class CorrectBoxComponent {

  constructor(public dialogRef: MatDialogRef<CorrectBoxComponent>) { }
  

  closeDialog() {
    this.dialogRef.close('next');
  }
}
