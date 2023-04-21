import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  usersNumber$ = new Observable();

  pieChartData$ = new Observable();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.usersNumber$ = this.dashboardService.getUsersAndClasses();
    this.pieChartData$ = this.dashboardService.getPublishedClasses();
  }
}
