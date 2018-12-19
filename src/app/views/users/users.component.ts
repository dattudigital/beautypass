import { Component, SecurityContext, ViewEncapsulation,OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { UsersListService } from '../../services/users-list.service';
import { NgxSpinnerService } from 'ngx-spinner';

// such override allows to keep some initial values

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
 
  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: UsersListService ,sanitizer: DomSanitizer) {
    
   }
   ngOnInit() {
    this.spinner.show();
    this.service.getUsersList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData)
      this.spinner.hide();
    });
  
  }
   
  editPromotion(data, index) {
    data.index = index;
    this.editData = data;
    this.totalItems=this.editData.length;
    console.log(this.editData.length)
  }
  updatePromotion(val) {
    console.log(val)
    var data = {
      comments: val.comments,
      rating_1: val.rating_1,
      rating_2: val.rating_2,
      rating_3: val.rating_3,
      rating_4: val.rating_4,
      rating_5: val.rating_5,
      recomment:val.recomment,
      status: val.status,
      uploadpic: val.uploadpic,
      user_id: val.user_id
    }
    
  }
  DeletePromotion(val) {
    console.log(val)
    var data = {
      comments: val.comments,
      fullname: val.fullname,
      rating_1: val.rating_1,
      rating_2: val.rating_2,
      rating_3: val.rating_3,
      rating_4: val.rating_4,
      rating_5: val.rating_5,
      recomment:val.recomment,
      status: 0,
      testimonial_createddate: val.testimonial_createddate,
      testimonial_id: val.testimonial_id,
      testimonial_modifydate: val.testimonial_modifydate,
      uploadpic: val.uploadpic,
      user_id: val.user_id
    }
    //this.service.editWrittenTestmonials(data).subscribe();
  }
}
