import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { EmployeeHistoryService } from '../../services/employee-history.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'employee-history.component.html',
})
export class EmployeeHistoryComponent implements OnInit {

  employeeHistoryData: any = [];
  cols: any = [];

  constructor(private spinner: NgxSpinnerService, private service: EmployeeHistoryService, private http: Http, ) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getEmployeeHistory().subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.employeeHistoryData = res.json().data;
      } else {
        this.employeeHistoryData = [];
      }
    });

    this.cols = [
      { field: 'emp_name', header: ' Name' },
      { field: 'operation', header: 'Operation' },
      { field: 'ipaddress', header: 'IpAddress' },
      { field: 'description', header: 'Description' }
    ];
  }

}
