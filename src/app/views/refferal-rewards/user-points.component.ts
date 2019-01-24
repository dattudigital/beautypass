import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap';
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
  userId: number;
  tableStatus = false;
  noDataFound = false;
  userHistoryData: any = [];
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any[];
  cols: any = [];
  userid: '';
  userPoints: '';
  userRemark: '';
  pointsForm: FormGroup;
  submitted = false;
  temp: any[] = new Array();
  userPointsData: any = {
    'mindbody_id': '',
    'location': '',
    'locationName': '',
    'studioid': '',
    'studioName': ''
  }
  popupStatus = false;

  constructor(private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private dp: DatePipe, private messageService: ToastMessageService, private formBuilder: FormBuilder, private service: RefferalRewardsService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.cols = [
      { field: 'mindbody_id', header: 'User ID' },
      { field: 'fullname', header: 'Name' },
      { field: 'email_id', header: 'Email' },
      { field: 'dob', header: 'DOB', type: this.dp },
      { field: 'location', header: 'Location Id' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioid', header: 'Studio Id' },
      { field: 'studioName', header: 'StudioName' },
    ];

    this.pointsForm = this.formBuilder.group({
      Id: ['', Validators.required],
      Points: ['', Validators.required],
      Remarks: ['', Validators.required],
    })
  }

  onSelect(event: TypeaheadMatch): void {
    let URL = '';
    if (event.item["mindbody_id"]) {
      URL = URL + '/' + event.item["mindbody_id"]
    }
    if (event.item["studioid"]) {
      URL = URL + '/' + event.item["studioid"]
    }
    this.spinner.show();
    this.service.getUserHistory(URL).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.tableStatus = true;
        this.selectedOption = res.json().data;
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  getUserData(val) {
    this.selectedValue = val.alldetails
    this.popupStatus = false;
    this.userInfo = [];
    let URL = '';
    if (val.mindbody_id) {
      URL = URL + '/' + val.mindbody_id
    }
    if (val.studioid) {
      URL = URL + '/' + val.studioid
    }
    this.spinner.show();
    this.service.getUserHistory(URL).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.tableStatus = true;
        this.selectedOption = res.json().data;
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  userSearch(val) {
    this.noDataFound = false;
    if (val.length > 2) {
      this.popupStatus = true;
      this.service.getUserlistForHistory(val).subscribe(res => {
        if (res.json().status == false) {
          this.userInfo = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.userInfo = res.json().data;
        }
      })

    } else {
      this.tableStatus = false;
      this.noResult = false;
      this.popupStatus = false;
      this.userInfo = [];
    }
  }

  getUserId(data) {
    this.userPointsData = data
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
      user_id: this.userPointsData.mindbody_id,
      studio_id: this.userPointsData.studioid,
      points: this.userPoints,
      reward_for: this.userRemark
    }
    let modelClose = document.getElementById("CloseButton");
    this.spinner.show();
    this.service.addUserPoints(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res.json().status == true) {
        this.messageService.successToast("user Points updated Successfully")
      } else {
        this.messageService.errorToast("user Points is not Updated")
      }
    })
  }

}
