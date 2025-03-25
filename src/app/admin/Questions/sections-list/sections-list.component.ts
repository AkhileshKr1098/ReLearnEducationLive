import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { Sections, SectionsRes } from 'src/app/interface/Question.interface';
import { AddSectionsComponent } from '../add-sections/add-sections.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss']
})
export class SectionsListComponent {
  Sections: Sections[] = []
  FilterSections: Sections[] = []
  deletevalue: any = 1
  constructor(
    private dialog: MatDialog,
    private _crud: CRUDService

  ) { }
  ngOnInit() {
    this.getData()
  }


  getData() {
    this._crud.getsections().subscribe(
      (res: SectionsRes) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.Sections = res.data
          this.FilterSections = res.data

        }
      }, (err: Error) => {
        console.log(err);

      }
    )
  }

  addNew() {
    const dilog = this.dialog.open(AddSectionsComponent, {
      disableClose: true,
    });

    dilog.afterClosed().subscribe(
      (res) => {
        this.getData()
      }
    )
  }

  onEdit(edit: any) {
    const dialogRef = this.dialog.open(AddSectionsComponent, {
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
        this._crud.sectionDeleted(item.id).subscribe(
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

    this.FilterSections = this.Sections.filter((res: any) =>
      res.week_num.toString().toLowerCase().includes(data)
    );
  }

}
