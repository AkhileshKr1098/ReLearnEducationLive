import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-sections',
  templateUrl: './add-sections.component.html',
  styleUrls: ['./add-sections.component.scss']
})
export class AddSectionsComponent {
  weeks!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddSectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.weeks = new FormGroup({
      sections_name: new FormControl('', Validators.required),
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
    this._crud.addsections(this.weeks.value).subscribe(
      (res: any) => {
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
    this._crud.sectionsUpdate(this.weeks.value).subscribe(
      (res: any) => {
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
