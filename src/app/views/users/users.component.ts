import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
import { PagerService } from '../pagination/pagination'
@Component({
  templateUrl: 'users.component.html',
  providers: [PagerService]
})

export class UsersComponent implements OnInit {
  userData: any;
  cols: any[];
  studioIdData: any;
  locationIdData: any;
  studioId: '';
  locationId = undefined;
  selectedVal: number=50;
  pager: any = {};
  pagedItems: any[];
  constructor(private spinner: NgxSpinnerService, private pagerService: PagerService, private service: UsersListService, private completeService: CompleteBeautypassService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getStudioId().subscribe(res => {
      if (res.json().status == true) {
        this.spinner.hide();
        this.studioIdData = res.json().data;       
      }
    })

    this.cols = [      
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'fullname', header: 'User Name' },
      { field: 'email_id', header: 'Email ID' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'gender', header: 'Gender' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioName', header: 'Studio Name' }
    ];
  }

  studioDetails() {
    let URL = ''
    if (this.studioId) {
      URL = this.studioId;
      this.spinner.show()
      this.service.getLocationId(URL).subscribe(res => {
        this.spinner.hide()
        this.locationIdData = res.json().data;
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
      this.pagedItems = res.json().data[1];
      this.pager = this.pagerService.getPager(res.json().data[0][0].totalusers, page, this.selectedVal);
    })
  }

  userSearchData() {
    this.setPage(1);
  }

}
