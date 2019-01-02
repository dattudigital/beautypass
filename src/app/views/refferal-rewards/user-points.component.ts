import { Component, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  templateUrl: 'user-points.component.html',
})
export class UserPointsComponent {
  toastOptionsSuccess: ToastOptions = {
    title: "Success",
    msg: "Successfully Done",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsError: ToastOptions = {
    title: "Error",
    msg: "Something is Wrong",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsWarn: ToastOptions = {
    title: "Not Found",
    msg: "No Data",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };

  userId: number;
  tableStatus = false;
  noDataFound = false;
  userHistoryData: any;
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any;
  cols: any = [];
  userid: '';
  userPoints: '';
  userRemark: '';
  pointsForm: FormGroup;
  submitted = false;

  constructor(private spinner: NgxSpinnerService, private toastyService: ToastyService, private formBuilder: FormBuilder, private service: RefferalRewardsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'user_id', header: 'User ID' },
      { field: 'points', header: 'Points' },
      { field: 'reward_for', header: 'Reward For' },
    ];

    this.pointsForm = this.formBuilder.group({
      Id: ['', Validators.required],
      Points: ['', Validators.required],
      Remarks: ['', Validators.required],
    })

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
    this.tableStatus = true;
    this.service.getUserRewardHistory(branch_id).subscribe(response => {
      this.userHistoryData = response.json().data;
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
  getUserId(data) {
    this.userid = data.user_id
  }

  removeFields() {
    this.userPoints = '';
    this.userRemark = '';
  }

  get f() { return this.pointsForm.controls; }

  addPoint() {
    this.submitted = true;
    if (this.pointsForm.invalid) {
      return;
    }
    var data: any = {
      user_id: this.userid,
      points: this.userPoints,
      reward_for: this.userRemark
    }
    let modelClose = document.getElementById("CloseButton");

    this.service.addUserPoints(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    })
  }

}
