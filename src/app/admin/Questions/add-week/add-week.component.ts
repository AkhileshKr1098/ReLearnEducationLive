import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { WeekInsertRes } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-add-week',
  templateUrl: './add-week.component.html',
  styleUrls: ['./add-week.component.scss']
})
export class AddWeekComponent {
  weeks!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddWeekComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.weeks = new FormGroup({
      week_num: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.weeks.patchValue(this.edit_data)
    }
  }

  submitForm() {
    console.log(this.weeks.value);
    this._crud.Week_insert(this.weeks.value).subscribe(
      (res: WeekInsertRes) => {
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
    console.log(this.weeks.value);
    this._crud.Week_update(this.weeks.value).subscribe(
      (res: WeekInsertRes) => {
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
