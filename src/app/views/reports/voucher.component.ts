import { Component,OnInit} from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;
@Component({
  templateUrl: 'voucher.component.html'
})
export class VoucherComponent implements OnInit {
  categorysData: any;
  startDate: any;
  endDate: any;

  constructor(private spinner: NgxSpinnerService,private router: Router,private service: ReportsService,private excelService:ExcelService) { }

ngOnInit(){
  this.spinner.show();
  this.service.getVoucherReports().subscribe(response => {
    this.categorysData = response.json().data;
    console.log(this.categorysData);
    this.spinner.hide();
  });
}
getStartDate(){
  console.log(this.startDate);
}
getEndDate(){
  console.log(this.endDate);
}
exportAsXLSX():void {
  this.excelService.exportAsExcelFile(this.categorysData, 'Voucher-Reports');
}
pdfDownload() {
  var columns = [
    { title: "coupons_for", dataKey: "coupons_for" },
    { title: "Used", dataKey: "Used" },
    { title: "Unused", dataKey: "Unused" },
    { title: "Expired", dataKey: "Expired" }
    
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
      doc.text("Vouchers",  30,30);      
    }
  });
  doc.save('Vouchers.pdf');
}
}
