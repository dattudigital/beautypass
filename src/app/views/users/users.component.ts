import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { UsersListService } from '../../services/users-list.service';
import { NgxSpinnerService } from 'ngx-spinner';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'users.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ]
})
export class UsersComponent implements OnInit {
  userData: any;

  constructor(private spinner: NgxSpinnerService, private service: UsersListService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getUsersList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.userData = response.json().data;
      } else {
        this.userData = [];
      }
    });
  }
}
