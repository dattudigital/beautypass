import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersListService } from '../../services/users-list.service';
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
  studioIdData: any;
  studioId: '';
  locationIdData: any;

  constructor(private spinner: NgxSpinnerService, private userlist: UsersListService, private service: ReportsService, private excelService: ExcelService) { }

  ngOnInit() {
    this.getReports();

    this.userlist.getStudioId().subscribe(res => {
      if (res["status"] == true) {
        this.spinner.hide();
        this.studioIdData = res["data"];
      }
    })

    this.cols = [
      { field: 'coupons_for', header: 'Coupons For' },
      { field: 'Used', header: 'Used' },
      { field: 'Unused', header: 'Unused' },
      { field: 'Expired', header: 'Expired' }
    ]
  }

  getReports() {
    this.url = '';
    this.spinner.show();
    this.service.getVoucherReports(this.url).subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.voucherData = response["data"];
      } else {
        this.voucherData = [];
      }
    });
  }

  getSearchReports() {
    this.url = '';
    var count = 0
    if (this.startDate) {
      if (count == 0) {
        count++
        this.url = this.url + "?";
      } else {
        this.url = this.url + "&";
      }
      this.url = this.url + 'startdate=' + this.startDate;
    }
    if (this.endDate) {
      if (count == 0) {
        count++
        this.url = this.url + "?";
      } else {
        this.url = this.url + "&";
      }
      this.url = this.url + 'enddate=' + this.endDate;
    }
    if (this.studioId) {
      if (count == 0) {
        count++
        this.url = this.url + "?";
      } else {
        this.url = this.url + "&";
      }
      this.url = this.url + 'studioid=' + this.studioId
    }
    console.log(this.url);
    this.spinner.show();
    this.service.getVoucherReports(this.url).subscribe(res => {
      this.spinner.hide();
      this.voucherData = res["data"];
    })
  }
  studioDetails() {
    console.log(this.studioId)
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.voucherData, 'Voucher-Reports');
  }

  detailsReset() {
    this.startDate = '';
    this.endDate = '';
    this.getReports();
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
