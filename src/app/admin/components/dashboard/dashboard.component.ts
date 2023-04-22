import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  publishedClassesTablePdf: any[] = [];
  totalUsersClassesTablePdf: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.pieChartData$ = this.dashboardService.getPublishedClasses();
    this.usersNumber$ = this.dashboardService.getUsersAndClasses();
    this.getPdfData();
  }

  async getPdfData() {
    await this.dashboardService.getUsersAndClasses().subscribe((data: any) => {
      data.forEach((item: any) => {
        this.totalUsersClassesTablePdf.push([item.name, item.value]);
      });
    });

    await this.dashboardService.getPublishedClasses().subscribe((data: any) => {
      data.forEach((item: any) => {
        this.publishedClassesTablePdf.push([item.name, item.value]);
      });
    });
  }

  exportPdf() {
    const doc = new jsPDF();

    doc.text('Dashboard Deutscher Runder Tisch', 100, 10, { align: 'center' });
    doc.addImage(
      '../../../assets/images/BRING_apostrophe_red_pos_rgb.png',
      'PNG',
      80,
      150,
      30,
      30
    );

    autoTable(doc, {
      head: [['Stats', 'Number']],
      body: this.totalUsersClassesTablePdf,
    });

    autoTable(doc, {
      head: [['Users', 'Classes Published']],
      body: this.publishedClassesTablePdf,
    });

    doc.save('table.pdf');
  }
}
