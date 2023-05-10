import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { from, map, Observable, toArray } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  usersNumber$ = new Observable();
  pieChartData$ = new Observable();
  timeLoggedInData$ = new Observable();
  totalUsersClassesTablePdf: any[] = [];
  publishedClassesTablePdf: any[] = [];

  //  eventSource!: EventSource;
  timeLoggedInData!: any[];
  private apiUrl: string = environment.baseUrl;

  constructor(
    private dashboardService: DashboardService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.pieChartData$ = this.dashboardService.getPublishedClasses();
    this.usersNumber$ = this.dashboardService.getUsersAndClasses();
    this.getPdfData();
    this.timeLoggedInData$ = this.webSocketService
      .getDatabaseTimeLoggedIn()
      .pipe(
        map((item: any) => {
          return Object.values(item).map((item: any) => ({
            name: item.name,
            value: Number(item.timeLoggedIn),
          }));
        })
      );

    /*     this.eventSource = new EventSource(
      'http://localhost:3000/get-time-logged-in-database'
    ); */

    /*     this.eventSource.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log('Received event:', data);
      this.timeLoggedInData$ = from([data]);
    }); */

    /*     this.eventSource.addEventListener('error', (error) => {
      console.error('Error connecting to SSE:', error);
    }); */
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

  exportExcel() {
    const workbook = XLSX.utils.book_new();

    const worksheet1 = XLSX.utils.json_to_sheet(
      this.totalUsersClassesTablePdf,
      {
        skipHeader: true,
      }
    );
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Stats');

    const worksheet2 = XLSX.utils.json_to_sheet(this.publishedClassesTablePdf, {
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet2,
      'Published classes by user'
    );

    XLSX.writeFile(workbook, 'data.xlsx');
  }

  exportTxt() {
    const txtBlob = new Blob(
      [
        'Stats:\n' +
          JSON.stringify(this.totalUsersClassesTablePdf) +
          '\n\n' +
          'Published classes by user:\n' +
          JSON.stringify(this.publishedClassesTablePdf),
      ],
      {
        type: 'text/plain;charset=utf-8',
      }
    );
    FileSaver.saveAs(txtBlob, 'data.txt');
  }

  tooltipText(data: any): string {
    return JSON.parse(JSON.stringify(data)).cell.tooltipText;
  }
}
