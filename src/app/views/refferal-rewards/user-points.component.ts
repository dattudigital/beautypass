import { Component, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  templateUrl: 'user-points.component.html',
})
export class UserPointsComponent {
  userId: number;
  tableStatus = false;
  noDataFound = false;
  userHistoryData: any;
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any;
  cols: any = [];

  constructor(private spinner: NgxSpinnerService, private service: RefferalRewardsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'user_id', header: 'User ID' },
      { field: 'points', header: 'Points' },
      { field: 'debit', header: 'Debit' },
      { field: 'reward_for', header: 'Reward For' },
      { field: 'refer_by', header: 'Reffer By' },
      { field: 'refer_by_name', header: 'Reffer By Name' },
      { field: 'refer_desc', header: 'Reffer Description' },
    ];

  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    let id = this.selectedOption.mindbody_id;
    this.setUserId(id);
  }

  userSearch(val) {
    this.tableStatus = false;
    this.noDataFound = false;
    if (val.length > 2) {
      this.service.getUserlistForHistory(val).subscribe(res => {
        let temp = [];
        temp.push(res.json().data);
        if (res.json().status == false) {
          this.userInfo = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.userInfo = temp.pop();
        }
      })
    } else {
      this.noResult = false;
      this.userInfo = [];
    }
  }

  setUserId(branch_id: any): void {
    this.userId = branch_id;
    console.log(branch_id)
    this.tableStatus = true;
    this.service.getUserRewardHistory(branch_id).subscribe(response => {
      this.userHistoryData = response.json().data;
      console.log(this.userHistoryData)
      if (this.userHistoryData.length != 0) {
        this.tableStatus = true;
        this.noDataFound = false;
      }
      else {
        this.tableStatus = false;
        this.noDataFound = true;
      }
    });
  }
}
