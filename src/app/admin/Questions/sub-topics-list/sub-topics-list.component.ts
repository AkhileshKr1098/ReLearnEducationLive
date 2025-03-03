import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { AddSubTopicsComponent } from '../add-sub-topics/add-sub-topics.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';

@Component({
  selector: 'app-sub-topics-list',
  templateUrl: './sub-topics-list.component.html',
  styleUrls: ['./sub-topics-list.component.scss']
})
export class SubTopicsListComponent {
  Subtopics: any[] = []
  FilterTopics: any[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getSubTopics().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.Subtopics = res.data
          this.FilterTopics = res.data
        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const opn = this.dialog.open(AddSubTopicsComponent, {
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
    const dialogRef = this.dialog.open(AddSubTopicsComponent, {
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
        this._crud.TopicsDelted(item.id).subscribe(
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

    this.FilterTopics = this.Subtopics.filter((res: any) =>
      res.day.toString().toLowerCase().includes(data)
    );
  }

}
