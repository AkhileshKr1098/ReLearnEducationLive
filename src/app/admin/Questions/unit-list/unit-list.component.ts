import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Day, Grade, Week } from 'src/app/interface/Question.interface';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { CRUDService } from 'src/app/crud.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent {
  units: any[] = []
  FilterUnit: any[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getUnit().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.units = res.data
          this.FilterUnit = res.data
        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const opn = this.dialog.open(AddUnitComponent, {
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
    const dialogRef = this.dialog.open(AddUnitComponent, {
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
        this._crud.classDeleted(item.id).subscribe(
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

    this.FilterUnit = this.units.filter((res: any) =>
      res.day.toString().toLowerCase().includes(data)
    );
  }

}
