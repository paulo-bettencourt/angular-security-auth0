import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  usersNumber = [
    {
      name: 'Users',
      value: 7,
    },
    {
      name: 'Classes',
      value: 14,
    },
  ];

  classesNumber = [
    {
      name: 'Classes',
      value: 14,
    },
  ];

  pieChartData = [
    { name: 'John', value: 5 },
    { name: 'Jane', value: 2 },
    { name: 'Bob', value: 7 },
    { name: 'Alice', value: 3 },
  ];
}
