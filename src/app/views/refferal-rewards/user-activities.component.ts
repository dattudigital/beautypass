import { Component, SecurityContext, ViewEncapsulation,OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;


@Component({
  templateUrl: 'user-activities.component.html',
})
export class UserActivitiesComponent implements OnInit {

  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  deleteData: { activity_id: any; activity_name: any; activity_points: any; activity_desc: any; activity_status: number; };
  constructor(private spinner: NgxSpinnerService,private router: Router,private excelService:ExcelService ,private service: RefferalRewardsService ,sanitizer: DomSanitizer) {
   
   }
   ngOnInit() {
    this.spinner.show();
    this.service.getUserActivitiesList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      this.spinner.hide();
    });
  
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.categorysData, 'Activity-Reports');
  }
  pdfDownload() {
    var columns = [
      { title: "activity_name", dataKey: "activity_name" },
      { title: "activity_points", dataKey: "activity_points" },
      { title: "activity_desc", dataKey: "activity_desc" },
      { title: "activity_start_date", dataKey: "activity_start_date" },
      { title: "activity_end_date", dataKey: "activity_end_date" }
      
    ];
  
    var rows = this.categorysData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor:[255,0,0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Activity-Reports",  30,30);      
      }
    });
    doc.save('Activity-Reports.pdf');
  }
}
