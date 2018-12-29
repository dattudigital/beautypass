import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestmonialsService } from '../../services/TestmonialsService';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';

// such override allows to keep some initial values

@Component({
  templateUrl: 'written-testimonials.component.html',
  styles: []
})

export class WrittenTestimonialsComponent implements OnInit {

  toastOptionsSuccess: ToastOptions = {
    title: "Success",
    msg: "Successfully Done",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsError: ToastOptions = {
    title: "Error",
    msg: "Something is Wrong",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsWarn: ToastOptions = {
    title: "Not Found",
    msg: "No Data",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };

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
  userData: any;
  deleteRecord = '';
  testimonialForm: FormGroup;
  submitted = false;
  copiedRow: '';

  constructor(private spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private router: Router, private service: TestmonialsService, private formBuilder: FormBuilder, private toastyService: ToastyService) { }
  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getWrittenTestmonials().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.testmonials = response.json().data;
      } else {
        this.testmonials = [];
      }
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));

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

  get f() { return this.testimonialForm.controls; }

  editTestimonials(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.testimonialData = data;
    this.testimonialData["index"] = index;
  }

  backupData() {
    let _index = this.testimonialData["index"];
    this.testmonials[_index] = this.copiedRow;
  }

  updateTestimonials() {
    this.submitted = true;
    if (this.testimonialForm.invalid) {
      return;
    }
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
      modelClose.click();
      if (res.json().status == true) {
        if (this.testimonialData.coupons_status == '0') {
          this.testmonials.splice(this.testimonialData["index"], 1);
          this.toastyService.success(this.toastOptionsSuccess);
        }
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

  deleteTestimonial(val, index) {
    this.deleteRecord = val
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.editWrittenTestmonials({ testimonial_id: this.deleteRecord["testimonial_id"], status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        this.testmonials.splice(this.deleteRecord["index"], 1)
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

}