import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.scss']
})
export class AddClassesComponent {
  Classes!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddClassesComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.Classes = new FormGroup({
      class: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.Classes.patchValue(this.edit_data)
    }
  }


  submitForm() {
    console.log(this.Classes.value);
    this._crud.classAdd(this.Classes.value).subscribe(
      (res) => {
        console.log(res);
        if (res.success == 1) {
          alert(res.message)
          this.matref.close(1)
        } else {
          alert(res.message)
        }
      }
    )
  }


  updateForm() {
    console.log(this.Classes.value);
    this._crud.classUpdate(this.Classes.value).subscribe(
      (res) => {
        console.log(res);
        if (res.success == 1) {
          alert(res.message)
          this.matref.close(1)
        } else {
          alert(res.message)
        }
      }
    )
  }

}
