import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  current_date: any

  constructor(
    private fb: FormBuilder,
    private _crud: CRUDService,
    private _router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      CountryCode: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gdprConsent: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this._crud.Student_registation(this.registrationForm.value).subscribe(
        (res: any) => {
          console.log(res);
          alert(res)
          this._router.navigate(['/'])

        }, (err: Error) => {
          alert(err)
        }
      )
      console.log('Form Data:', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
      alert('Please fill all the required filed')
    }
  }
}
