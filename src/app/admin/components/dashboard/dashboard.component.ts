import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BehaviorSubject, from, map, Observable, toArray } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
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
  timeLoggedInData$ = new BehaviorSubject<any>('');
  totalUsersClassesTablePdf: any[] = [];
  publishedClassesTablePdf: any[] = [];
  socket!: WebSocket;
  transformedObservable$: any;

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
    this.socket = new WebSocket('ws://localhost:8080/');
    this.webSocketService
      .getDatabaseTimeLoggedIn()
      .pipe(
        map((items: any) => {
          return Object.values(items).map((item: any) => ({
            name: item.name,
            value: item.timeLoggedIn,
          }));
        })
      )
      .subscribe((data) => {
        this.timeLoggedInData$.next(data);
      });

    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.socket.onmessage = (event: any) => {
      const userDatabase = JSON.parse(event.data);
      if (Array.isArray(userDatabase)) {
        const refactoredUserDatabase = userDatabase.map((item: any) => ({
          name: item.name,
          value: item.timeLoggedIn,
        }));
        this.timeLoggedInData$.next(refactoredUserDatabase);
      }
    };
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
