import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Day, Grade, Week } from 'src/app/interface/Question.interface';
import { CRUDService } from 'src/app/crud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent {
  classe: any[] = []
  unitForm!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.unitForm = new FormGroup({
      unit: new FormControl('', Validators.required),
      class_id_fk: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.unitForm.patchValue(this.edit_data)
    }

    this.onGetClass()
  }

  onGetClass() {
    this._crud.getClass().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.classe = res.data
        }

      }
    )
  }

  onGetGrades(event: any) {
    console.log(event.target.value)

  }

  submitForm() {
    this._crud.addUnit(this.unitForm.value).subscribe(
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
    console.log(this.unitForm.value);
    this._crud.unitUpdate(this.unitForm.value).subscribe(
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
