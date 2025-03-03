import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { Week, WeekRes } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent {
  weeks: Week[] = []
  Days!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddDayComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.Days = new FormGroup({
      day: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.Days.patchValue(this.edit_data)
    }
    this.get_week()
  }

  get_week() {
    this._crud.getWeek().subscribe(
      (res: WeekRes) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.weeks = res.data
        }
      }
    )
  }

  submitForm() {
    console.log(this.Days.value);
    this._crud.InserDay(this.Days.value).subscribe(
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
    console.log(this.Days.value);
    this._crud.UpdateDay(this.Days.value).subscribe(
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
