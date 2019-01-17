import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
@Component({
  templateUrl: 'users.component.html',
})

export class UsersComponent implements OnInit {
  userData: any;
  cols: any[];

  constructor(private spinner: NgxSpinnerService, private service: UsersListService, private completeService: CompleteBeautypassService) { }

  ngOnInit() {
    let _user = this.completeService.getUser();
    if (Object.keys(_user).length) {
      this.userData = _user;
    } else {
      this.spinner.show();
      this.service.getUsersList().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.userData = response.json().data;
          this.completeService.addUser(response.json().data)
        } else {
          this.userData = [];
        }
      });
    }

    this.cols = [
      { field: 'fullname', header: 'User Name' },
      { field: 'email_id', header: 'Email ID' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'gender', header: 'Gender' },
      { field: 'mindbody_id', header: 'Mind Body Id' },
    ];
  }

}
