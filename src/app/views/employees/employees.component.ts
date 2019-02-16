import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { ToastMessageService } from '../../services/toast-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';

@Component({
  templateUrl: 'employees.component.html',
  providers: [ToastMessageService]
})

export class EmployeesComponent implements OnInit {
  employeeDetails: any;
  deleteData: any = [];
  userData: any;
  employeeData = {
    'emp_firstname': '',
    'emp_lastname': '',
    'emp_password': '',
    'emp_email': '',
    "emp_address": "hyd",
    "emp_mobile": "",
    "emp_branch": "hyd",
    "emp_role": "1",
    "emp_status": " ",
    "employee_id": null
  }
  employeeForm: FormGroup;
  cols: any = [];
  submitted = false;
  deleteRecord: '';
  copiedRow: '';

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private service: LoginService, private router: Router, private messageService: ToastMessageService, ) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _employee = this.completeService.getEmployees()
    if (Object.keys(_employee).length) {
      this.employeeDetails = _employee;
    } else {
      this.spinner.show();
      this.service.getEmpList().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.employeeDetails = response.json().data;
          this.completeService.addEmployees(response.json().data)
        } else {
          this.employeeDetails = [];
        }
      });
    }

    if (localStorage.loginDetails) {
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
    }

    this.employeeForm = this.formBuilder.group({
      employeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeBranch: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.cols = [
      { field: 'emp_firstname', header: 'First Name' },
      { field: 'emp_lastname', header: 'Last Name' },
      { field: 'emp_address', header: 'Address' },
      { field: 'emp_mobile', header: 'Mobile' },
      { field: 'emp_email', header: 'Email' },
      { field: 'emp_branch', header: 'Branch' }
    ];

  }

  removeFields() {
    this.submitted = false;
    this.employeeData.employee_id = '',
      this.employeeData.emp_firstname = '',
      this.employeeData.emp_lastname = '',
      this.employeeData.emp_address = '',
      this.employeeData.emp_mobile = '',
      this.employeeData.emp_email = '',
      this.employeeData.emp_password = '',
      this.employeeData.emp_branch = '',
      this.employeeData.emp_role = '',
      this.employeeData.emp_status = ''
  }

  get f() { return this.employeeForm.controls; }

  addOrUpdateEmployees() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    if (!this.employeeData.employee_id) {
      this.employeeData.emp_status = '1'
    }
    if (!this.employeeData.employee_id) {
      this.employeeData.employee_id = null;
    }

    var data = {
      employee_id: this.employeeData.employee_id,
      emp_firstname: this.employeeData.emp_firstname,
      emp_lastname: this.employeeData.emp_lastname,
      emp_address: this.employeeData.emp_address,
      emp_mobile: this.employeeData.emp_mobile,
      emp_email: this.employeeData.emp_email,
      emp_password: this.employeeData.emp_password,
      emp_branch: this.employeeData.emp_branch,
      emp_role: this.employeeData.emp_role,
      emp_status: this.employeeData.emp_status
    }
    let modelClose = document.getElementById("CloseEmployee");
    this.spinner.show();
    this.service.addOrUpdateEmployee(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res.json().status == true) {
        if (!this.employeeData.employee_id) {
          if (JSON.parse(localStorage.getItem('employee'))) {
            this.employeeDetails = JSON.parse(localStorage.getItem('employee'))
          }
          this.employeeDetails.push(res.json().data)
          this.employeeDetails = this.employeeDetails.slice();
          this.completeService.addEmployees([]);
          this.messageService.successToast("Employee Added Successfully")
        } else {
          if (this.employeeData.emp_status == '0') {
            // this.employeeDetails.splice(this.employeeData["index"], 1);
            this.employeeDetails = this.employeeDetails.slice();
            localStorage.setItem('employee', JSON.stringify(this.employeeDetails))
            this.completeService.addEmployees([]);
            this.messageService.successToast("Employee Inactive Successfully")
          } else {
            this.employeeDetails[this.employeeData["index"]] = res.json().data;
            this.completeService.addEmployees([]);
            this.messageService.successToast("Employee Updated Successfully")
          }
        }
      } else {
        this.messageService.errorToast('Employee not added')
      }
    })
  }

  editEmployee(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.employeeData = data;
    this.employeeData["index"] = index;
  }

  backupData() {
    let _index = this.employeeData["index"];
    this.employeeDetails[_index] = this.copiedRow;
  }

  DeleteEmployee(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.spinner.show();
    this.service.deleteEmployee(this.deleteRecord["employee_id"]).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.employeeDetails.splice(this.deleteRecord["index"], 1);
        this.completeService.addEmployees([])
        localStorage.setItem('employee', JSON.stringify(this.employeeDetails))
        this.messageService.successToast("Employee Deleted Successfully")
      } else {
        this.messageService.errorToast('Employee not Deleted')
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getEmpList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.employeeDetails = response.json().data;
        this.completeService.addEmployees(response.json().data)
      } else {
        this.employeeDetails = [];
      }
    });
  }
}
