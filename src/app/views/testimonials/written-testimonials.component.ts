import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { TestmonialsService } from '../../services/TestmonialsService';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  testmonials: any[];
  cols: any[];
  testimonialData: any = {
    'fullname': '',
    'comments': '',
    'recomment': '',
    'rating_1': '',
    'rating_2': '',
    'rating_3': '',
    'rating_4': '',
    'rating_5': ''
  }
  totalItems: number;
  editData: any = [];
  bigCurrentPage: number = 1;
  deleteData: any = []; 
  userData: any;
  temp :any;
  deleteRecord = '';


  testimonialForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private router: Router, private service: TestmonialsService, sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
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
      this.testmonials = response.json().data;
      console.log(this.testmonials);
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      console.log(this.userData[0].employee_id);
      this.spinner.hide();
    });

    this.cols = [
      { field: 'fullname', header: 'Username' },
      { field: 'comments', header: 'Comments' },
      { field: 'recomment', header: 'Recomment' },
      { field: 'rating_1', header: 'Rating_1' },
      { field: 'rating_2', header: 'Rating_2' },
      { field: 'rating_3', header: 'Rating_3' },
      { field: 'rating_4', header: 'Rating_4' },
      { field: 'rating_5', header: 'Rating_5' },
    ];

    this.testimonialForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Comment: ['', Validators.required],
      Recomment: ['', Validators.required],
      Rating1: ['', Validators.required],
      Rating2: ['', Validators.required],
      Rating3: ['', Validators.required],
      Rating4: ['', Validators.required],
      Rating5: ['', Validators.required],
    });

  }
  editTestimonials(data, index) {
    data.index = index;
    this.editData = data;
    console.log(this.editData)
    this.totalItems = this.editData.length;
    // console.log(this.editData.length)
    this.temp = index;
    this.testimonialData.testimonial_id = this.editData[index].testimonial_id,
      this.testimonialData.fullname = this.editData[index].fullname,
      this.testimonialData.comments = this.editData[index].comments,
      this.testimonialData.recomment = this.editData[index].recomment,
      this.testimonialData.rating_1 = this.editData[index].rating_1,
      this.testimonialData.rating_2 = this.editData[index].rating_2,
      this.testimonialData.rating_3 = this.editData[index].rating_3,
      this.testimonialData.rating_4 = this.editData[index].rating_4,
      this.testimonialData.rating_5 = this.editData[index].rating_5,
      this.testimonialData.status = this.editData[index].status
  }

  updateTestimonial() {
    var data = {
      testimonial_id: this.testimonialData.testimonial_id,
      comments: this.testimonialData.comments,
      recomment: this.testimonialData.recomment,
      rating_1: this.testimonialData.rating_1,
      rating_2: this.testimonialData.rating_2,
      rating_3: this.testimonialData.rating_3,
      rating_4: this.testimonialData.rating_4,
      rating_5: this.testimonialData.rating_5,
      status: this.testimonialData.status,
      updatedempid: this.userData[0].employee_id
    }
    let modelClose = document.getElementById("CloseButton");
    this.service.editWrittenTestmonials(data).subscribe(res => {
      console.log(res.json().data)
      modelClose.click();
      if (res.json().status == true) {
        this.testmonials.push(res.json().data)
      }
      this.editData[this.temp].comments = data.comments;
      this.editData[this.temp].recomment = data.recomment;
      this.editData[this.temp].rating_1 = data.rating_1;
      this.editData[this.temp].rating_2 = data.rating_2;
      this.editData[this.temp].rating_3 = data.rating_3;
      this.editData[this.temp].rating_4 = data.rating_4;
      this.editData[this.temp].rating_5 = data.rating_5;
      this.editData[this.temp].status = data.status;
    });
    this.alerts.push({
      type: 'success',
      msg: `Testmonial Details Updated Successfully`,
      timeout: 5000
    });
    this.add();
  }
  
  DeleteTestimonial(val) {
    this.deleteRecord = val
    var data = {
      testimonial_id: val.testimonial_id,
      status: 0,
    }
    this.deleteData = data;
  }
  
  deleteAlert() {
    this.service.editWrittenTestmonials(this.deleteData).subscribe();
    this.delete();
    this.service.getWrittenTestmonials().subscribe(response => {
      this.testmonials = response.json().data;
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
