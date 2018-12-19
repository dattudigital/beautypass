import { Component, SecurityContext, ViewEncapsulation,OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { TestmonialsService } from '../../services/TestmonialsService';
import { NgxSpinnerService } from 'ngx-spinner';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
  templateUrl: 'written-testimonials.component.html',
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

export class WrittenTestimonialsComponent implements OnInit {
  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  deleteConfirm: boolean;
  deleteData: { testimonial_id: any; user_id: any; rating_1: any; rating_2: any; rating_3: any; rating_4: any; rating_5: any; comments: any; status: number; recomment: any; uploadpic: any; };
  userData: any;
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: TestmonialsService ,sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
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
  backToDashBoard() {
    this.router.navigate(['reports'])
  }
  ngOnInit() {
    this.spinner.show();
  this.service.getWrittenTestmonials().subscribe(response => {
    this.categorysData = response.json().data;
    console.log(this.categorysData);
    this.userData=JSON.parse(localStorage.getItem('loginDetails'));
    console.log(this.userData[0].employee_id);
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
  let element = document.getElementById("CloseButton");
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
    user_id: val.user_id,
    updatedempid:this.userData[0].employee_id
  }
  this.service.editWrittenTestmonials(data).subscribe();
  this.alerts.push({
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  });
  this.add();
  element.click();
}
onSubmit() {
  //console.log(this.editData.tip_title);
  this.updatePromotion(this.editData);
}
DeletePromotion(val) {
  console.log(val)
  var data = {
    testimonial_id: val.testimonial_id,
    user_id: val.user_id,
    rating_1: val.rating_1,
    rating_2: val.rating_2,
    rating_3: val.rating_3,
    rating_4: val.rating_4,
    rating_5: val.rating_5,
    comments:val.comments,
    status: 0,
    recomment: val.recomment,
    uploadpic: val.uploadpic,
  }
  this.deleteData=data;
}
deleteAlert(){
  this.deleteConfirm=true;
  this.service.editWrittenTestmonials(this.deleteData).subscribe();
  this.delete();
  this.categorysData=[];
  this.service.getWrittenTestmonials().subscribe(response => {
    this.categorysData = response.json().data;
    console.log(this.categorysData)
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
delete(): void {
  this.alertsDismiss.push({
    type: 'danger',
    msg: `Deleted Sucessfully!`,
    timeout: 5000
  });
}
}
