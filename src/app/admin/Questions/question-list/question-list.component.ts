import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';
import { Class, ClassRes, Sections, Topics, TopicsRes } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  sections: Sections[] = []
  Classes: Class[] = []
  topics: Topics[] = []
  Question: any[] = []
  FilterQuestion: any[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService
  ) { }

  ngOnInit() {
    this.getTopics()
    this.getSection()
  }

  getClass() {
    this._crud.getClass().subscribe(
      (res: ClassRes) => {
        if (Array.isArray(res.data)) {
          this.Classes = res.data
        }
      }
    )
  }
  getSection() {
    this._crud.getsections().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.sections = res.data
        }
      }
    )
  }
  getTopics() {
    this._crud.getTopics().subscribe(
      (res: TopicsRes) => {
        if (Array.isArray(res.data)) {
          this.topics = res.data
        }
      }
    )
  }

  getData() {
    this._crud.getQuestion().subscribe(
      (res) => {
        this.Question = res
        this.FilterQuestion = res
        console.log(this.FilterQuestion)

      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const opn = this.dialog.open(AddQuestionComponent, {
      disableClose: true,
    });

    opn.afterClosed().subscribe(
      (res) => {
        console.log(res);
        this.getData()
      }
    )
  }

  onEdit(edit: any) {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      disableClose: true,
      data: edit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.deletevalue == result) {
        this.getData()
      }
    }
    )

  }

  delete_application(item: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponentComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(item);

      if (this.deletevalue == result) {
        this._crud.QuestionDeleted(item.id).subscribe(
          (res: any) => {
            console.log(res)
            if (res.success == 1) {
              alert(res.message)
              this.getData()
            } else {
              alert(res.message)
            }

          }
        )
      }
      else { }
    });
  }

  onSearch(event: any) {
    const data = event.target.value.toLowerCase();
    console.log(data);

    this.FilterQuestion = this.Question.filter((res: any) =>
      res.day.toString().toLowerCase().includes(data)
    );
  }

}
