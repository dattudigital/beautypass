import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
import { PagerService } from '../pagination/pagination';
import { ToastMessageService } from '../../services/toast-message.service';

@Component({
  templateUrl: 'users.component.html',
  providers: [PagerService, ToastMessageService]
})

export class UsersComponent implements OnInit {
  studioIdData: any;
  locationIdData: any;
  studioId: '';
  locationId = undefined;
  selectedVal: number = 50;
  pager: any = {};
  pagedItems: any[];

  constructor(private spinner: NgxSpinnerService, private pagerService: PagerService, private service: UsersListService, private completeService: CompleteBeautypassService, private messageService: ToastMessageService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getStudioId().subscribe(res => {
      if (res["status"] == true) {
        this.spinner.hide();
        this.studioIdData = res["data"];
      }
    })
  }

  studioDetails() {
    let URL = ''
    if (this.studioId) {
      URL = this.studioId;
      this.spinner.show()
      this.service.getLocationId(URL).subscribe(res => {
        this.spinner.hide()
        this.locationIdData = res["data"];
      })
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    var url = '';
    if (this.studioId) {
      url = url + '/' + this.studioId;
    }
    if (this.locationId) {
      url = url + '/' + this.locationId
    }
    url = url + "/" + ((page - 1) * this.selectedVal);
    url = url + "/" + this.selectedVal;
    this.spinner.show();
    this.service.getUsers(url).subscribe(res => {
      this.spinner.hide();
      this.pagedItems = res["data"][1];
      this.pager = this.pagerService.getPager(res["data"][0][0].totalusers, page, this.selectedVal);
    })
  }

  userSearchData() {
    if (!this.studioId) {
      this.messageService.errorToast("Please Select Studio");
      return;
    }
    if (!this.locationId) {
      this.messageService.errorToast("Please Select Location")
      return;
    }
    this.setPage(1);
  }

}
