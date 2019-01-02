import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { ExcelService } from '../../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jsPDF: any;
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import * as moment from 'moment';

@Component({
  templateUrl: 'user-activities.component.html',
  providers: [
    DatePipe
  ]
})

export class UserActivitiesComponent implements OnInit {
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
  userActivitiesData: any;
  cols: any = [];
  activityForm: FormGroup;
  userActivity: any = {
    'activity_id': null,
    'activity_name': '',
    'activity_points': '',
    'activity_desc': '',
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

  constructor(private spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private toastyService: ToastyService, private formBuilder: FormBuilder, private router: Router, private excelService: ExcelService, private service: RefferalRewardsService, private dp: DatePipe) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getUserActivitiesList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.userActivitiesData = response.json().data;
      } else {
        this.userActivitiesData = [];
      }
    });

    if (localStorage.loginDetails) {
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
    }

    this.cols = [
      { field: 'activity_name', header: 'Name' },
      { field: 'activity_points', header: 'Points' },
      { field: 'activity_desc', header: 'Description' },
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
      data.createdemp_id = this.userData.employee_id;
    } else {
      data.updatedempid = this.userData.employee_id;
    }
    console.log(data)
    let modelClose = document.getElementById("CloseButton");
    this.service._addOrEditRefferalActivities(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.userActivity.activity_id) {
          this.userActivitiesData.push(res.json().data)
        } else {
          if (this.userActivity.activity_status == '0') {
            this.userActivitiesData.splice(this.userActivity["index"], 1);
          } else {
            this.userActivitiesData[this.userActivity["index"]] = res.json().data;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);

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
    this.service._addOrEditRefferalActivities({ activity_id: this.deleteRecord["activity_id"], activity_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        this.userActivitiesData.splice(this.deleteRecord["index"], 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
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

}
