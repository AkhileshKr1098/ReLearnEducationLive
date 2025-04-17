import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import { CRUDService } from 'src/app/crud.service';
import { Sections, SectionsRes, SubTopic, Topics, Week } from 'src/app/interface/Question.interface';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  current_day = 5

  weeksList: Week[] = []
  TopicsList: Topics[] = []
  SectionsList: Sections[] = []
  allTopics: string = ''
  percent: number = 50;
  userLoginData = {
    name: 'MR. Json',
    age: 11,
    class: 'LKG',
    school: 'US, Publics school ',
    country: 'USA',
    profile_img: '../../../assets/icon/profile.jpeg',
    currentPoint: 350
  }

  days1 = [
    { name: 'Day 1', url: '../../../assets/icon/day1.png' },
    { name: 'Day 2', url: '../../../assets/icon/day2.png' },
    { name: 'Day 3', url: '../../../assets/icon/day3.png' }

  ];

  days2 = [
    { name: 'Day 4', url: '../../../assets/icon/day4.png' },
    { name: 'Day 5', url: '../../../assets/icon/day5.png' },
    { name: 'Day 6', url: '../../../assets/icon/day6.png' },

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
        this.allTopics = ''
        console.log(res)
        if (Array.isArray(res.data)) {
          this.TopicsList = res.data
          for (let index = 0; index < res.data.length; index++) {
            if (index == 0) {
              this.allTopics += res.data[index].topics
            } else {
              this.allTopics += ', ' + res.data[index].topics
            }
          }

          console.log(this.allTopics)

        }
      }
    )
  }

  getSections(weekno: number) {
    this._crud.getsections().subscribe(
      (res: SectionsRes) => {
        if (Array.isArray(res.data)) {
          this.SectionsList = res.data
        }
      }
    )

    this.getTopics(weekno)
  }

}


