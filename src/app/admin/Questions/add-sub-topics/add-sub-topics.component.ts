import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-sub-topics',
  templateUrl: './add-sub-topics.component.html',
  styleUrls: ['./add-sub-topics.component.scss']
})
export class AddSubTopicsComponent {
  classe: any[] = []
  units: any[] = []
  TopicsForm!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddSubTopicsComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.TopicsForm = new FormGroup({
      topics: new FormControl('', Validators.required),
      class_id_fk: new FormControl('', Validators.required),
      unit_id_fk: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.GetUnit(this.edit_data.class_id_fk)
      this.TopicsForm.patchValue(this.edit_data)
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

  onGetUnit(ev: any) {
    const class_id = ev.target.value
    this._crud.getUnitByClass(class_id).subscribe(
      (res: any) => {
        console.log(res);

        if (Array.isArray(res.data)) {
          this.units = res.data;
        } else {
          this.units = [];
          console.error('Error fetching units:', res.message || 'Invalid response');
        }
      },
      (error) => {
        console.error('HTTP error:', error);
        this.units = [];
      }
    );
  }

  GetUnit(cls: string) {
    this._crud.getUnitByClass(cls).subscribe(
      (res: any) => {
        console.log(res);

        if (Array.isArray(res.data)) {
          this.units = res.data;
        } else {
          this.units = [];
          console.error('Error fetching units:', res.message || 'Invalid response');
        }
      },
      (error) => {
        console.error('HTTP error:', error);
        this.units = [];
      }
    );
  }


  onGetGrades(event: any) {
    console.log(event.target.value)

  }

  submitForm() {
    this._crud.addTopics(this.TopicsForm.value).subscribe(
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
    console.log(this.TopicsForm.value);
    this._crud.TopicsUpdate(this.TopicsForm.value).subscribe(
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
