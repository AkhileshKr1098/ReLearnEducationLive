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
  topics: any[] = []
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
      sub_topics: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.TopicsForm.patchValue(this.edit_data)
    }

    this.getTopics()
  }

  getTopics() {
    this._crud.getTopics().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.topics = res.data
        }

      }
    )
  }


  submitForm() {
    const fdata = new FormData()
    fdata.append('topics', this.TopicsForm.get('topics')?.value)
    fdata.append('sub_topics', this.TopicsForm.get('sub_topics')?.value)
    this._crud.addSubTopics(fdata).subscribe(
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
    const fdata = new FormData()
    fdata.append('id', this.TopicsForm.get('id')?.value)
    fdata.append('topics', this.TopicsForm.get('topics')?.value)
    fdata.append('sub_topics', this.TopicsForm.get('sub_topics')?.value)

    this._crud.addSubTopics(fdata).subscribe(
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
