import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'user-activities.component.html',
  providers: [
    DatePipe
  ]
})

export class UserActivitiesComponent implements OnInit {
  userActivitiesData: any;
  cols: any = [];

  constructor(private spinner: NgxSpinnerService, private router: Router, private excelService: ExcelService, private service: RefferalRewardsService, private dp: DatePipe) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getUserActivitiesList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.userActivitiesData = response.json().data;
      } else {
        this.userActivitiesData = [];
      }
    });

    this.cols = [
      { field: 'activity_name', header: 'Name' },
      { field: 'activity_points', header: 'Points' },
      { field: 'activity_desc', header: 'Description' },
      { field: 'activity_start_date', header: 'Start Date', type: this.dp },
      { field: 'activity_end_date', header: 'End Date', type: this.dp },
    ];
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.userActivitiesData, 'Activity-Reports');
  }

  pdfDownload() {
    var columns = [
      { title: "Name", dataKey: "activity_name" },
      { title: "Points", dataKey: "activity_points" },
      { title: "Description", dataKey: "activity_desc" },
      { title: "Start Date", dataKey: "activity_start_date" },
      { title: "End Date", dataKey: "activity_end_date" }
    ];
    var rows = this.userActivitiesData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Activity-Reports", 30, 30);
      }
    });
    doc.save('Activity-Reports.pdf');
  }

}
