import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { AddTopicsComponent } from '../add-topics/add-topics.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent {
  topics: any[] = []
  FilterTopics: any[] = []
  deletevalue: any = 1
  base_url: string = ''
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) {
    this._crud.img_base_url.subscribe(
      (res) => {
        this.base_url = res
      }
    )
  }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getTopics().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.topics = res.data
          this.FilterTopics = res.data
        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const opn = this.dialog.open(AddTopicsComponent, {
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
    const dialogRef = this.dialog.open(AddTopicsComponent, {
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

    this.FilterTopics = this.topics.filter((res: any) =>
      res.day.toString().toLowerCase().includes(data)
    );
  }

}
