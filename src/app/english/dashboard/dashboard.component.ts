import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  callStatics: any = [1, 15, 0, 8, 1, 14, 0, 0, 40, 0, 25, 0]
  percent: number = 50;  // Ensure it's a number

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          },
          color: "#333"
        }
      }
    }
  };

  public chartType: ChartType = 'line';

  public chartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    datasets: [
      {
        data: this.callStatics,
        label: 'Report',
        borderColor: '#FF3B30',
        backgroundColor: 'rgba(255, 59, 48, 0.3)',
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#FF3B30',
        tension: 0.4
      },

    ],
  };

  constructor() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

  }
  days = [
    { name: 'Day 1', gradient: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' },
    { name: 'Day 2', gradient: 'radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 100%)' },
    { name: 'Day 3', gradient: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' },
    { name: 'Day 4', gradient: 'radial-gradient(circle, rgba(238,130,238,1) 0%, rgba(75,0,130,1) 100%)' },
    { name: 'Day 5', gradient: 'radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 100%)' },
    { name: 'Day 6', gradient: 'radial-gradient(circle, rgba(144,238,144,1) 0%, rgba(0,128,0,1) 100%)' },
  ];

  ngOnInit() {
    setTimeout(() => {
      this.percent = 50;
    }, 100);
  }
}
