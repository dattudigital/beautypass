import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perks-report',
  templateUrl: './perks-report.component.html',
})
export class PerksReportComponent implements OnInit {
  cols: any = [];
  url: any = '';
  voucherData: any;

  constructor(private service: ReportsService,private spinner:NgxSpinnerService ) { }

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

}
