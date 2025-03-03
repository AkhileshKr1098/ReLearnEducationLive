import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { AddWeekComponent } from '../add-week/add-week.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';
import { Week, WeekRes } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent {
  Weeks: Week[] = []
  FilterWeeks: Week[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getWeek().subscribe(
      (res: WeekRes) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.Weeks = res.data
          this.FilterWeeks = res.data

        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    this.dialog.open(AddWeekComponent, {
      disableClose: true,
    });
  }

  onEdit(edit: any) {
    const dialogRef = this.dialog.open(AddWeekComponent, {
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
        this._crud.Week_delete(item.id).subscribe(
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

    this.FilterWeeks = this.Weeks.filter((res: any) =>
      res.week_num.toString().toLowerCase().includes(data)
    );
  }

}
