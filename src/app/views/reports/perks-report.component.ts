import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UsersListService } from '../../services/users-list.service';

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
  studioIdData: any;
  startDate: any;
  endDate: any;
  studioId: '';

  constructor(private service: ReportsService, private userlist: UsersListService, private dp: DatePipe, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getReports();

    this.userlist.getStudioId().subscribe(res => {
      if (res["status"] == true) {
        this.spinner.hide();
        this.studioIdData = res["data"];
      }
    })

    this.cols = [
      { field: 'user_id', header: 'User Id' },
      { field: 'coupon_status', header: 'Status' },
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

  getReports() {
    this.url = '';
    this.spinner.show();
    this.service.getPerksReports(this.url).subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.perksData = response["data"];
      } else {
        this.perksData = [];
      }
    });
  }

  getSearchReports() {
    this.url = '';
    var count = 0;
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
    this.service.getPerksReports(this.url).subscribe(res => {
      this.spinner.hide();
      this.perksData = res["data"];
    })
  }

  detailsReset() {
    this.studioId = undefined;
    this.startDate = '';
    this.endDate = '';
    this.getReports();
  }

}
