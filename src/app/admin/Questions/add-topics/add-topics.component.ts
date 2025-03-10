import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeScale } from 'chart.js';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.scss']
})
export class AddTopicsComponent {
  classe: any[] = []
  units: any[] = []
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
      class_id_fk: new FormControl('', Validators.required),
      unit_id_fk: new FormControl('', Validators.required),
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
      this.GetUnit(this.edit_data.class_id_fk)
      this.TopicsForm.patchValue(this.edit_data)
      this.topics_img = this.base_url + this.edit_data.topics_img
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
    fromdata.append('class_id_fk', this.TopicsForm.get('class_id_fk')?.value)
    fromdata.append('unit_id_fk', this.TopicsForm.get('unit_id_fk')?.value)
    fromdata.append('topics', this.TopicsForm.get('topics')?.value)
    fromdata.append('topics_img', this.topics_img_url)

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
    fromdata.append('class_id_fk', this.TopicsForm.get('class_id_fk')?.value)
    fromdata.append('unit_id_fk', this.TopicsForm.get('unit_id_fk')?.value)
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
