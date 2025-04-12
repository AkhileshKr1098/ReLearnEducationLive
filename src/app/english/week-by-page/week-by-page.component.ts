import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-week-by-page',
  templateUrl: './week-by-page.component.html',
  styleUrls: ['./week-by-page.component.scss']
})
export class WeekByPageComponent {
  constructor(
    private _router: Router,
  ) {

  }
  days = [
    { name: 'Day 1', url: '../../../assets/icon/day1.avif' },
    { name: 'Day 2', url: '../../../assets/icon/day2.avif' },
    { name: 'Day 3', url: '../../../assets/icon/day3.avif' },
    { name: 'Day 4', url: '../../../assets/icon/day4.avif' },
    { name: 'Day 5', url: '../../../assets/icon/day5.avif' },
    { name: 'Day 6', url: '../../../assets/icon/day6.avif' },

  ];

  onQuestion(day: any) {
    console.log(day)
    this._router.navigate(['/english/topics'])
  }
}
