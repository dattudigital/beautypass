import { Component, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'user-history.component.html',
  providers: [
    DatePipe
  ]
})
export class UserHistoryComponent {
  tableStatus = false;
  noDataFound = false;
  popupStatus = false;
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any = [];
  cols: any = [];
  temp: any[] = new Array();

  constructor(private spinner: NgxSpinnerService, private dp: DatePipe, private service: RefferalRewardsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'user_id', header: 'User ID' },
      { field: 'fullname', header: 'Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'dob', header: 'DOB', type: this.dp },
      { field: 'location', header: 'Location Id' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioid', header: 'Studio Id' },
      { field: 'studioName', header: 'StudioName' },
      { field: 'reward_for', header: 'Remarks' },
      { field: 'points', header: 'Credit' },
      { field: 'debit', header: 'Debit' },
      { field: 'rewarddate', header: 'Purchase Date', type: this.dp }
    ];
  }

  getUserData(val) {
    this.selectedValue = val.alldetails;
    let URL = '';
    if (val.mindbody_id) {
      URL = URL + '/' + val.mindbody_id
    }
    if (val.studioid) {
      URL = URL + '/' + val.studioid
    }
    URL = URL + '/1'
    this.spinner.show();
    this.service.getUserHistory(URL).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.popupStatus = false;
        this.tableStatus = true;
        this.selectedOption = res["data"];
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  timeout: any = null;
  doDelayedSearch(val) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    var self = this;
    this.timeout = setTimeout(function () {
      self.userSearch(val);
      console.log(val)
    }, 500);
  }

  userSearch(val) {
    this.noDataFound = false;
    if (val.length > 2) {
      this.tableStatus = false;
      this.popupStatus = true;
      this.spinner.show();
      this.service.getUserlistForHistory(val).subscribe(res => {
        this.spinner.hide();
        if (res["status"] == false) {
          this.userInfo = [];
          this.noResult = true;
          this.popupStatus = false;
        } else {
          this.noResult = false;
          this.userInfo = res["data"];
        }
      })
    } else {
      this.tableStatus = false;
      this.noResult = false;
      this.popupStatus = false;
      this.userInfo = [];
    }
  }

}
