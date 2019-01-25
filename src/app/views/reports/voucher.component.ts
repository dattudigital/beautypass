import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;

@Component({
  templateUrl: 'voucher.component.html'
})

export class VoucherComponent implements OnInit {
  voucherData: any;
  startDate: any;
  endDate: any;
  cols: any = [];
  url: any = '';

  constructor(private spinner: NgxSpinnerService, private service: ReportsService, private excelService: ExcelService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getVoucherReports(this.url).subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.voucherData = response.json().data;
      } else {
        this.voucherData = [];
      }
    });

    this.cols = [
      { field: 'coupons_for', header: 'Coupons For' },
      { field: 'Used', header: 'Used' },
      { field: 'Unused', header: 'Unused' },
      { field: 'Expired', header: 'Expired' }
    ]
  }

  getSearchReports() {
    this.url = '';
    if (this.startDate) {
      this.url = this.url + '?startdate=' + this.startDate;
    }
    if (this.endDate) {
      this.url = this.url + '&enddate=' + this.endDate;
    }
    this.spinner.show();
    this.service.getVoucherReports(this.url).subscribe(res => {
      this.spinner.hide();
      this.voucherData = res.json().data;
    })
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.voucherData, 'Voucher-Reports');
  }

  pdfDownload() {
    var columns = [
      { title: "Coupons For", dataKey: "coupons_for" },
      { title: "Used", dataKey: "Used" },
      { title: "Unused", dataKey: "Unused" },
      { title: "Expired", dataKey: "Expired" }

    ];
    var rows = this.voucherData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Vouchers", 30, 30);
      }
    });
    doc.save('Vouchers.pdf');
  }

}
