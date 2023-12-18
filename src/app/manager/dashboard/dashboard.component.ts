import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2023-12-1',
          '2023-12-2',
          '2023-12-3',
          '2023-12-4',
          '2023-12-5',
          '2023-12-6',
          '2023-12-7',
          '2023-12-8',
          '2023-12-9',
          '2023-12-10',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: '#1C4E80',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: '#199CD9',
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            text: 'Sales & Profit Chart',
            display: true,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
}
