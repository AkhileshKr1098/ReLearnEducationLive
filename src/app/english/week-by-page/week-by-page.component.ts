import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-week-by-page',
  templateUrl: './week-by-page.component.html',
  styleUrls: ['./week-by-page.component.scss']
})
export class WeekByPageComponent {

  current_day = 5
  constructor(
    private _router: Router,
  ) {

  }
  days = [
    { name: 'Day 1', url: '../../../assets/icon/Seal Day 1 (1).png' },
    { name: 'Day 2', url: '../../../assets/icon/Day 2 without bg.png' },
    { name: 'Day 3', url: '../../../assets/icon/Day 3 without bg.png' },
    { name: 'Day 4', url: '../../../assets/icon/Day_1_New-removebg-preview.png' },
    { name: 'Day 5', url: '../../../assets/icon/Day_3-removebg-preview.png' },
    { name: 'Day 6', url: '../../../assets/icon/Day 1 Final (1).png' },

  ];

  onQuestion(day: any) {
    console.log(day)
    this._router.navigate(['/english/topics'])
  }
}
