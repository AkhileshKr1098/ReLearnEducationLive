import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudenAddFormComponent } from '../studen-add-form/studen-add-form.component';
import { ConfirmBoxComponentComponent } from '../confirm-box-component/confirm-box-component.component';
import { CRUDService } from 'src/app/crud.service';
import { UserProfile } from 'src/app/interface/student.interface';

@Component({
  selector: 'app-studen-list',
  templateUrl: './studen-list.component.html',
  styleUrls: ['./studen-list.component.scss']
})
export class StudenListComponent implements OnInit {
  applicants = [
    {
      id: 1,
      name: "John Smith",
      grade: "LKG",
      phone: "6202572787",
      email: "john.smith@gmail.com",
      city: "New York"
    },
    {
      id: 2,
      name: "Emily Johnson",
      grade: "UKG",
      phone: "6202572788",
      email: "emily.johnson@gmail.com",
      city: "Los Angeles"
    },
    {
      id: 3,
      name: "Michael Williams",
      grade: "1st Grade",
      phone: "6202572789",
      email: "michael.williams@gmail.com",
      city: "Chicago"
    },
    {
      id: 4,
      name: "Sophia Brown",
      grade: "2nd Grade",
      phone: "6202572790",
      email: "sophia.brown@gmail.com",
      city: "Houston"
    },
    {
      id: 5,
      name: "David Miller",
      grade: "3rd Grade",
      phone: "6202572791",
      email: "david.miller@gmail.com",
      city: "San Francisco"
    }
  ];

  stdeuntList: UserProfile[] = []

  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.gte_student_data()
  }


  gte_student_data() {
    this._crud.get_student_data().subscribe(
      (res: UserProfile) => {
        console.log(res);
        if (Array.isArray(res)) {
          this.stdeuntList = res
        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }
  add_new_std() {
    this.dialog.open(StudenAddFormComponent, {
      disableClose: true,
      width: "90vw",
      height:"90vh"
    });
  }

  delete_application() {
    this.dialog.open(ConfirmBoxComponentComponent, {

      disableClose: true
    })
  }

}
