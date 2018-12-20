import { Component, SecurityContext, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'employees.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})

export class EmployeesComponent implements OnInit {
  //@ViewChild('myForm') mytemplateForm : ngForm;
  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  totalItems: number;
  bigCurrentPage: number = 1;
  currentImage: any = '';
  bankuploadedFiles: any;
  myFiles: string[] = [];
  bankstmtImage: number = 0;
  data = [];
  uploadedFiles: any[] = [];
  userImageName = '';
  userimagePreview: any;
  userImage: string;
  hideModal = false;
  alertMessageValue: boolean;
  validBtn: boolean;
  employeeData = {
    'emp_firstname': '',
    'emp_lastname': '',
    'emp_password': '',
    'emp_email': '',
    "emp_address": "hyd",
    "emp_mobile": "",
    "emp_branch": "hyd",
    "emp_role": "1",
    "emp_status": "1",
    "employee_id": null
  }
  employeeDetails: any;
  createdValue = false;
  deleteData: { employee_id: any; emp_status: number; };
  userData: any;

  constructor(private spinner: NgxSpinnerService, private service: LoginService, private router: Router, sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getEmpList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.employeeDetails = response.json().data;
      } else {
        this.employeeDetails = [];
      }
      if (localStorage.loginDetails) {
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
        console.log(this.userData[0].employee_id);
      }
    });
  }

  alertsHtml: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];

  clearData() {
    this.employeeData.emp_email = '';
    this.employeeData.emp_firstname = '';
    this.employeeData.emp_lastname = '';
    this.employeeData.emp_mobile = '';
    this.employeeData.emp_password = '';
    this.employeeData.emp_address = '';
    this.employeeData.emp_branch = '';
    this.employeeData.employee_id = '';
  }

  editEmployee(data, index) {
    console.log(index)
    data.index = index
    console.log(data)
    this.employeeData = data;
    console.log(this.employeeData)
  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("Login")).reset();
  }

  addOrUpdateEmployees(val) {
    if (this.employeeData.emp_firstname != '' && this.employeeData.emp_lastname != '' && this.employeeData.emp_mobile != '' && this.employeeData.emp_address != '' && this.employeeData.emp_password != '' && this.employeeData.emp_branch != '') {
      let element = document.getElementById("CloseButton");
      console.log(val)
      var data = {
        employee_id: val.employee_id,
        emp_firstname: val.emp_firstname,
        emp_lastname: val.emp_lastname,
        emp_address: val.emp_address,
        emp_mobile: val.emp_mobile,
        emp_email: val.emp_email,
        emp_password: val.emp_password,
        emp_branch: val.emp_branch,
        emp_role: val.emp_role,
        emp_status: val.emp_status
      }
      console.log(data.employee_id)
      this.service.addOrUpdateEmployee(data).subscribe();
      element.click();
      this.employeeDetails = [];
      this.service.getEmpList().subscribe(response => {
        this.employeeDetails = response.json().data;
        console.log(this.employeeDetails);
        //this.addCreate();
        this.clearForm();
      });
    }
  }
  deleteuser: any = []
  DeleteEmployee(val, i) {
    console.log(val)
    console.log(i)
    this.deleteuser = val;
    console.log(this.deleteData);
    var data = {
      employee_id: val.employee_id,
      emp_status: 0
    }
    this.deleteData = data;
  }

  deleteAlert() {
    this.service.addOrUpdateEmployee(this.deleteData).subscribe();
    this.delete();
    this.employeeDetails = [];
    this.service.getEmpList().subscribe(response => {
      this.employeeDetails = response.json().data;
      console.log(this.employeeDetails)
    });
  }

  alertsDismiss: any = [];
  add(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Updated Sucessfully!`,
      timeout: 5000
    });
  }

  addCreate(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Created Sucessfully!`,
      timeout: 5000
    });
  }

  delete(): void {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `Deleted Sucessfully!`,
      timeout: 5000
    });
  }

  saveEmployee() {
    console.log(this.employeeData);
    this.addOrUpdateEmployees(this.employeeData)
  }

}
