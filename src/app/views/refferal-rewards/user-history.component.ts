import { Component, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'user-history.component.html',
  providers: [
    DatePipe
  ]
})
export class UserHistoryComponent {
  tableStatus = false;
  noDataFound = false;
  selectedValue: string;
  userInfo: any = [];
  noResult = false;
  selectedOption: any[];
  cols: any = [];
  temp: any[] = new Array();

  constructor(private spinner: NgxSpinnerService,private dp: DatePipe,private service: RefferalRewardsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'user_id', header: 'User ID' },
      { field: 'fullname', header: 'Name' },
      { field: 'email_id', header: 'Email' },
       { field: 'dob', header: 'DOB' ,type: this.dp},
      { field: 'location', header: 'Location Id' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioid', header: 'Studio Id' },
      { field: 'studioName', header: 'StudioName' },
    ];

  }
  onSelect(event: TypeaheadMatch): void {
    var data = [];
    data.push(event.item)
    this.selectedOption = data;
    console.log(this.selectedOption)
    this.tableStatus = true;
  }

  userSearch(val) {
    this.noDataFound = false;
    if (val.length > 2) {
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
      this.userInfo = [];
    }
  }

}
