import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { AddDayComponent } from '../add-day/add-day.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';
import { DayRes } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent {
  Days: any[] = []
  FilterDays: any[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getDays().subscribe(
      (res: DayRes) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.Days = res.data
          this.FilterDays = res.data
        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const opn = this.dialog.open(AddDayComponent, {
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
    const dialogRef = this.dialog.open(AddDayComponent, {
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
        this._crud.Day_delete(item.id).subscribe(
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

    this.FilterDays = this.Days.filter((res: any) =>
      res.day.toString().toLowerCase().includes(data)
    );
  }

}
