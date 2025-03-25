import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeScale } from 'chart.js';
import { CRUDService } from 'src/app/crud.service';
import { Sections } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.scss']
})
export class AddTopicsComponent {
  Sections: Sections[] = []
  TopicsForm!: FormGroup
  topics_img: any = '../../../../assets/icon/topicsDfultImg.jpg'
  topics_img_url: any
  base_url: string = ''
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddTopicsComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.TopicsForm = new FormGroup({
      topics: new FormControl('', Validators.required),
      sections: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });

    this._crud.img_base_url.subscribe(
      (res) => {
        this.base_url = res
      }
    )
  }

  ngOnInit() {
    console.log(this.edit_data);
    if (this.edit_data) {
      this.TopicsForm.patchValue(this.edit_data)
      this.topics_img = this.base_url + this.edit_data.topics_img
    }

    this.onGetSections()
  }

  onGetSections() {
    this._crud.getsections().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.Sections = res.data
        }

      }
    )
  }




  onFileChange(event: any) {
    this.topics_img_url = event.target.files[0];
    if (this.topics_img_url) {
      const reader = new FileReader();
      reader.onload = () => {
        this.topics_img = reader.result;
      };
      reader.readAsDataURL(this.topics_img_url);
    }
  }

  submitForm() {

    const fromdata = new FormData()
    fromdata.append('topics', this.TopicsForm.get('topics')?.value)
    fromdata.append('sections', this.TopicsForm.get('sections')?.value)
    fromdata.append('topics_img', this.topics_img_url)

    console.log(this.TopicsForm.value)
    this._crud.addTopics(fromdata).subscribe(
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
    const fromdata = new FormData()
    fromdata.append('id', this.TopicsForm.get('id')?.value)
    fromdata.append('sections', this.TopicsForm.get('sections')?.value)
    fromdata.append('topics', this.TopicsForm.get('topics')?.value)

    if (this.topics_img) {
      fromdata.append('topics_img', this.topics_img_url)
    } else {
      fromdata.append('topics_img', this.edit_data.topics_img)
    }
    this._crud.addTopics(fromdata).subscribe(
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
