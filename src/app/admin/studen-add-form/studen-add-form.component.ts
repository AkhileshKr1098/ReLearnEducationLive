import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponentComponent } from '../confirm-box-component/confirm-box-component.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studen-add-form',
  templateUrl: './studen-add-form.component.html',
  styleUrls: ['./studen-add-form.component.scss']
})
export class StudenAddFormComponent implements OnInit {
  registrationForm!: FormGroup
  profileImage: any = '../../../assets/icon/profile.jpeg'
  constructor(
    private _fb: FormBuilder
  ) {

    this.registrationForm = new FormGroup({
      Name1: new FormControl('', Validators.required),
      FatherName: new FormControl(''),
      MotherName: new FormControl(''),
      EmailID: new FormControl('', [Validators.required, Validators.email]),
      MobileNo: new FormControl('', Validators.required),
      DOB: new FormControl(''),
      Address: new FormControl(''),
      City: new FormControl(''),
      State: new FormControl(''),
      Country: new FormControl(''),
      PinCode: new FormControl(''),
      Gender: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log(this);
    
  }

  submitForm() {

  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
