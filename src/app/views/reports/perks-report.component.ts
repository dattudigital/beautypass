import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perks-report',
  templateUrl: './perks-report.component.html',
  providers: [
    DatePipe
  ]
})
export class PerksReportComponent implements OnInit {
  cols: any = [];
  url: any = '';
  perksData: any;

  constructor(private service: ReportsService, private dp: DatePipe, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getPerksReports().subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.perksData = response["data"];
      } else {
        this.perksData = [];
      }
    });

    this.cols = [
      { field: 'user_id', header: 'User Id' },
      { field: 'coupon_status', header: 'Status' },
      { field: 'location_id', header: 'Location Id' },
      { field: 'location_name', header: 'Location Name' },
      { field: 'studio_id', header: 'Studio Id' },
      { field: 'studio_name', header: 'Studio Name' },
      { field: 'coupons_for', header: 'Coupon Value' },
      { field: 'coupons_number', header: 'Coupon Number' },
      { field: 'fullname', header: 'User Name' },
      { field: 'email_id', header: 'Email Id' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'coupon_createddate', header: 'Coupon Created', type: this.dp }
    ]
  }

}
