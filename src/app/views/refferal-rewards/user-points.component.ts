import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessageService } from '../../services/toast-message.service';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'user-points.component.html',
  providers: [
    ToastMessageService,
    DatePipe
  ]
})
export class UserPointsComponent {
  tableStatus = false;
  noDataFound = false;
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any = [];
  cols: any = [];
  addUserPoints: any;
  removeUserPoints: any;
  userRemark: '';
  pointsForm: FormGroup;
  submitted = false;
  popupStatus = false;
  userPointsData: any = {
    'mindbody_id': '',
    'location': '',
    'locationName': '',
    'studioid': '',
    'studioName': '',
    'employeeName': '',
    'empId': ''
  }
  toAdd = false
  toRemove = false
  userData: any;
  totalPoints: any = 0;
  constructor(private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private dp: DatePipe, private messageService: ToastMessageService, private formBuilder: FormBuilder, private service: RefferalRewardsService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

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
      { field: 'points', header: 'Credit' },
      { field: 'debit', header: 'Debit' },
      { field: 'reward_for', header: 'Remarks' },
      { field: 'emp_name', header: 'Employee Name' }

    ];

    this.pointsForm = this.formBuilder.group({
      Points: ['', Validators.required],
      // Pointsr: ['', Validators.required],
      Remarks: ['', Validators.required],
    })
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
        console.log(this.selectedOption)
        let credit = 0, debit = 0;
        this.selectedOption.forEach(element => {
          credit = credit + element.points;
          debit = debit + element.debit;
        });
        this.totalPoints = credit - debit;
        console.log(this.totalPoints)
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

  getUserId() {
    this.userData = JSON.parse(localStorage.getItem('loginDetails'));
    this.userPointsData = this.selectedOption;
    this.userPointsData.user_id = this.userPointsData[0].user_id;
    this.userPointsData.location = this.userPointsData[0].location;
    this.userPointsData.locationName = this.userPointsData[0].locationName;
    this.userPointsData.studioid = this.userPointsData[0].studioid;
    this.userPointsData.studioName = this.userPointsData[0].studioName;
    this.userPointsData.employeeName = this.userData.data[0].emp_firstname + " " + this.userData.data[0].emp_lastname;
    this.userPointsData.empId = this.userData.data[0].employee_id;
  }

  add(val) {
    if (val == 1) {
      this.removeUserPoints = 0;
      this.toAdd = true;
      this.toRemove = false
    }
    if (val == 0) {
      this.addUserPoints = 0;
      this.toAdd = false;
      this.toRemove = true;
    }
  }

  removeFields() {
    this.submitted = false;
    this.addUserPoints = '';
    this.removeUserPoints = '';
    this.userRemark = '';
  }

  get f() { return this.pointsForm.controls; }

  addPoint() {
    this.submitted = true;
    if (this.pointsForm.invalid) {
      return;
    }
    var data: any = {
      user_id: this.userPointsData.user_id,
      studio_id: this.userPointsData.studioid,
      points: this.addUserPoints,
      debit: this.removeUserPoints,
      emp_name: this.userPointsData.employeeName,
      emp_id: this.userPointsData.empId,
      reward_for: this.userRemark
    }
    let modelClose = document.getElementById("CloseButton");
    this.spinner.show();
    if (data.points) {
      this.totalPoints = this.totalPoints * 1 + data.points * 1;
    }
    if (data.debit) {
      this.totalPoints = this.totalPoints * 1 - data.debit * 1;
    }
    this.service.addUserPoints(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res["status"] == true) {
        this.messageService.successToast("user Points updated Successfully")
      } else {
        this.messageService.errorToast("user Points is not Updated")
      }
    })
  }

}
