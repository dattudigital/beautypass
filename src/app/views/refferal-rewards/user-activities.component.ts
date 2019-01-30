import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastMessageService } from '../../services/toast-message.service';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';

@Component({
  templateUrl: 'user-activities.component.html',
  providers: [
    DatePipe,
    ToastMessageService
  ]
})

export class UserActivitiesComponent implements OnInit {
  userActivitiesData: any;
  cols: any = [];
  activityForm: FormGroup;
  userActivity: any = {
    'activity_id': null,
    'activity_name': '',
    'activity_points': '',
    'activity_desc': '',
    'activity_code': '',
    'activity_start_date': '',
    'activity_end_date': '',
    'createdemp_id': '',
    'updatedempid': '',
    'activity_status': ''
  }
  submitted = false;
  userData: any;
  copiedRow: '';
  deleteRecord: '';
  randomNumber: any;

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private messageService: ToastMessageService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private router: Router, private excelService: ExcelService, private service: RefferalRewardsService, private dp: DatePipe) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _useractivity = this.completeService.getUserActivity()
    if (Object.keys(_useractivity).length) {
      this.userActivitiesData = _useractivity;
    } else {
      this.spinner.show();
      this.service.getUserActivitiesList().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.userActivitiesData = response.json().data;
          this.completeService.addUserActivity(response.json().data)
        } else {
          this.userActivitiesData = [];
        }
      });
    }

    if (localStorage.loginDetails) {
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
    }

    this.cols = [
      { field: 'activity_name', header: 'Name' },
      { field: 'activity_points', header: 'Points' },
      { field: 'activity_desc', header: 'Description' },
      { field: 'activity_code', header: 'Code' },
      { field: 'activity_start_date', header: 'Start Date', type: this.dp },
      { field: 'activity_end_date', header: 'End Date', type: this.dp },
    ];
    this.activityForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Points: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    })
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.userActivitiesData, 'Activity-Reports');
  }

  pdfDownload() {
    var columns = [
      { title: "Name", dataKey: "activity_name" },
      { title: "Points", dataKey: "activity_points" },
      { title: "Description", dataKey: "activity_desc" },
      { title: "Start Date", dataKey: "activity_start_date" },
      { title: "End Date", dataKey: "activity_end_date" }
    ];
    var rows = this.userActivitiesData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Activity-Reports", 30, 30);
      }
    });
    doc.save('Activity-Reports.pdf');
  }

  get f() { return this.activityForm.controls; }

  randomCode() {
    this.randomNumber = Math.floor(100000 + Math.random() * 900000);
  }

  addOrUpdateUserActivity() {
    this.submitted = true;
    if (this.activityForm.invalid) {
      return;
    }
    if (!this.userActivity.activity_id) {
      this.userActivity.activity_status = '1'

    }
    if (!this.userActivity.activity_id) {
      this.userActivity.activity_id = null
    }
    this.randomNumber = 187349;

    var data: any = {
      activity_id: this.userActivity.activity_id,
      activity_name: this.userActivity.activity_name,
      activity_points: this.userActivity.activity_points,
      activity_desc: this.userActivity.activity_desc,
      activity_start_date: this.userActivity.activity_start_date,
      activity_end_date: this.userActivity.activity_end_date,
      activity_status: this.userActivity.activity_status
    }

    if (!this.userActivity.activity_id) {
      for (var i = 0; i < this.userActivitiesData.length; i++) {
        if (this.userActivitiesData[i].activity_code == this.randomNumber) {
          this.randomCode();
          i = 0;
        }
        if (i + 1 == this.userActivitiesData.length) {
          data.activity_code = this.randomNumber;
        }
      }
    }

    if (!this.userActivity.activity_id) {
      data.createdemp_id = this.userData.employee_id;
    } else {
      data.updatedempid = this.userData.employee_id;
    }

    let modelClose = document.getElementById("CloseActivity");
    this.spinner.show();
    this.service._addOrEditRefferalActivities(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res.json().status == true) {
        if (!this.userActivity.activity_id) {
          if (JSON.parse(localStorage.getItem('activityData'))) {
            this.userActivitiesData = JSON.parse(localStorage.getItem('activityData'))
          }
          this.userActivitiesData.push(res.json().data)
          this.userActivitiesData = this.userActivitiesData.slice();
          this.completeService.addUserActivity(this.userActivitiesData);
          this.messageService.successToast("User Activity Added Successfully")
        } else {
          if (this.userActivity.activity_status == '0') {
            this.userActivitiesData.splice(this.userActivity["index"], 1);
            this.userActivitiesData = this.userActivitiesData.slice();
            localStorage.setItem('activityData', JSON.stringify(this.userActivitiesData))
            this.completeService.addUserActivity(this.userActivitiesData);
            this.messageService.successToast("User Activity Inactive Successfully")
          } else {
            this.userActivitiesData[this.userActivity["index"]] = res.json().data;
            this.completeService.addUserActivity(this.userActivitiesData);
            this.messageService.successToast("User Activity Updated Successfully")
          }
        }
      } else {
        this.messageService.successToast("User Activity not Added ")
      }
    })
  }

  editUserActivity(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.userActivity = data;
    if (this.userActivity.activity_start_date) {
      let newDate = moment(this.userActivity.activity_start_date).format('YYYY-MM-DD').toString();
      this.userActivity.activity_start_date = newDate;
    }
    if (this.userActivity.activity_end_date) {
      let newDate = moment(this.userActivity.activity_end_date).format('YYYY-MM-DD').toString();
      this.userActivity.activity_end_date = newDate;
    }
    this.userActivity['index'] = index;
  }

  backupData() {
    let _index = this.userActivity["index"];
    this.userActivitiesData[_index] = this.copiedRow;
  }

  deleteUserActivity(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.spinner.show();
    this.service._addOrEditRefferalActivities({ activity_id: this.deleteRecord["activity_id"], activity_status: 0 }).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.userActivitiesData.splice(this.deleteRecord["index"], 1);
        this.completeService.addUserActivity(this.userActivitiesData);
        localStorage.setItem('activityData', JSON.stringify(this.userActivitiesData))
        this.messageService.successToast("User Activity Deleted Successfully")
      } else {
        this.messageService.successToast("User Activity not Deleted ")
      }
    });
  }

  removeFields() {
    this.submitted = false;
    this.userActivity.activity_id = '';
    this.userActivity.activity_name = '';
    this.userActivity.activity_points = '';
    this.userActivity.activity_desc = '';
    this.userActivity.activity_start_date = '';
    this.userActivity.activity_end_date = '';
    this.userActivity.activity_status = '';
  }

  reloadClick() {
    this.spinner.show();
    this.service.getUserActivitiesList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.userActivitiesData = response.json().data;
      } else {
        this.userActivitiesData = [];
      }
    });
  }

}
