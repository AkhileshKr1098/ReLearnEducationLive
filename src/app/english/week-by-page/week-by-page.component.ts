import { Component } from '@angular/core';

@Component({
  selector: 'app-week-by-page',
  templateUrl: './week-by-page.component.html',
  styleUrls: ['./week-by-page.component.scss']
})
export class WeekByPageComponent {
  days = [
    { name: 'Day 1', gradient: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' },
    { name: 'Day 2', gradient: 'radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 100%)' },
    { name: 'Day 3', gradient: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' },
    { name: 'Day 4', gradient: 'radial-gradient(circle, rgba(238,130,238,1) 0%, rgba(75,0,130,1) 100%)' },
    { name: 'Day 5', gradient: 'radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 100%)' },
    { name: 'Day 6', gradient: 'radial-gradient(circle, rgba(144,238,144,1) 0%, rgba(0,128,0,1) 100%)' }
  ];
}
