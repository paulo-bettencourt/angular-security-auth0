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
  title = 'Angular Charts';

  view: any[] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  //pie
  showLabels = true;

  // data goes here
  public single = [
    {
      name: 'Bring Users',
      value: 2,
    },
    {
      name: 'USA',
      value: 10,
    },
    {
      name: 'Norway',
      value: 5,
    },
    {
      name: 'Japan',
      value: 3,
    },
    {
      name: 'Germany',
      value: 6,
    },
    {
      name: 'France',
      value: 5,
    },
  ];

  public multi = [
    {
      name: 'China',
      series: [
        {
          name: '2018',
          value: 2243772,
        },
        {
          name: '2017',
          value: 1227770,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2018',
          value: 1126000,
        },
        {
          name: '2017',
          value: 764666,
        },
      ],
    },

    {
      name: 'Norway',
      series: [
        {
          name: '2018',
          value: 296215,
        },
        {
          name: '2017',
          value: 209122,
        },
      ],
    },

    {
      name: 'Japan',
      series: [
        {
          name: '2018',
          value: 257363,
        },
        {
          name: '2017',
          value: 205350,
        },
      ],
    },

    {
      name: 'Germany',
      series: [
        {
          name: '2018',
          value: 196750,
        },
        {
          name: '2017',
          value: 129246,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2018',
          value: 204617,
        },
        {
          name: '2017',
          value: 149797,
        },
      ],
    },
  ];
}
