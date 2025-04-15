import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import { CRUDService } from 'src/app/crud.service';
import { Topics, Week } from 'src/app/interface/Question.interface';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  weeksList: Week[] = []
  TopicsList: Topics[] = []
  percent: number = 50;
  userLoginData = {
    name: 'MR. Json',
    age: 11,
    class: 'LKG',
    country: 'USA',
    profile_img: '../../../assets/icon/profile.jpeg',
    currentPoint: 350
  }

  days = [
    { name: 'Day 1', gradient: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' },
    { name: 'Day 2', gradient: 'radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 100%)' },
    { name: 'Day 3', gradient: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' },
    { name: 'Day 4', gradient: 'radial-gradient(circle, rgba(238,130,238,1) 0%, rgba(75,0,130,1) 100%)' },
    { name: 'Day 5', gradient: 'radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 100%)' },
    { name: 'Day 6', gradient: 'radial-gradient(circle, rgba(144,238,144,1) 0%, rgba(0,128,0,1) 100%)' },
  ];



  constructor(
    private _crud: CRUDService,
    private _shared: SharedService
  ) { }


  ngOnInit() {
    this.getWeeks()
  }

  getWeeks() {
    this._crud.getWeek().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          this.weeksList = res.data
        }
      }
    )
  }

  getTopics(week: number) {
    this._crud.getTopics().subscribe(
      (res) => {
        console.log(res)
        if (Array.isArray(res.data)) {
          this.TopicsList = res.data
        }
      }
    )
  }
}


