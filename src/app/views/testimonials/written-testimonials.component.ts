import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { TestmonialsService } from '../../services/TestmonialsService';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// such override allows to keep some initial values

@Component({
  templateUrl: 'written-testimonials.component.html',
  styles: [ ]
})

export class WrittenTestimonialsComponent implements OnInit {

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
  editData: any = [];
  deleteData: any = []; 
  userData: any;
  deleteRecord = '';
  testimonialForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private router: Router, private service: TestmonialsService, private formBuilder: FormBuilder) {}
  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getWrittenTestmonials().subscribe(response => {
      this.testmonials = response.json().data;
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      console.log(this.userData[0].employee_id);
      this.spinner.hide();
    });

    this.cols = [
      { field: 'fullname', header: 'Username' },
      { field: 'comments', header: 'Comments' },
      { field: 'recomment', header: 'Recomment' },
      { field: 'rating_1', header: 'Rating 1' },
      { field: 'rating_2', header: 'Rating 2' },
      { field: 'rating_3', header: 'Rating 3' },
      { field: 'rating_4', header: 'Rating 4' },
      { field: 'rating_5', header: 'Rating 5' },
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
  editTestimonials(data) {
    this.testimonialData = data;
    console.log(this.testimonialData)
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
        this.testimonialData=data
      }
    });
  }
  
  DeleteTestimonial(val) {
    console.log(val)
    this.deleteRecord = val
    var data = {
      testimonial_id: val.testimonial_id,
      status: 0,
    }
    this.deleteData = data;
  }
  
  deleteAlert() {
    this.service.editWrittenTestmonials(this.deleteData).subscribe();
    this.service.getWrittenTestmonials().subscribe(response => {
      this.testmonials = response.json().data;
    });
  }
}
