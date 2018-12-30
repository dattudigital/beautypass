import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestmonialsService } from "../../services/TestmonialsService";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData } from 'ng2-toasty';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'video-testimonials.component.html'
})

export class VideoTestimonialsComponent {

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

  videoTestimonials: any[];
  cols: any[];
  videoTestimonialData: any = {
    'fullname': '',
    'description': '',
    'likes': '',
    'video': ''
  }
  editData: any = []
  userData: any;
  videoTestimonialForm: FormGroup;
  deleteRecord = '';
  submitted = false;
  copiedRow: '';

  constructor(private spinner: NgxSpinnerService, private router: Router, private service: TestmonialsService, private toastyService: ToastyService, private formBuilder: FormBuilder) { }

  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getVideoTestmonials().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.videoTestimonials = response.json().data;
        console.log(this.videoTestimonials);
      } else {
        this.videoTestimonials = [];
      }
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
    });

    this.cols = [
      { field: 'fullname', header: 'Username' },
      { field: 'description', header: 'Description' },
      { field: 'likes', header: 'Likes' },
      { field: 'video', header: 'Video' }
    ];

    this.videoTestimonialForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Video: ['', Validators.required],
      Likes: ['', Validators.required],
    });
  }

  editVideoTestimonials(data, index) {
    this.copiedRow = Object.assign({}, data)
    this.videoTestimonialData = data;
    this.videoTestimonialData["index"] = index;
  }

  backupData() {
    let _index = this.videoTestimonialData["index"];
    this.videoTestimonials[_index] = this.copiedRow;
  }

  get f() { return this.videoTestimonialForm.controls; }

  updateTestimonial() {
    this.submitted = true;
    if (this.videoTestimonialForm.invalid) {
      return;
    }
    var data = {
      testimonial_id: this.videoTestimonialData.testimonial_id,
      description: this.videoTestimonialData.description,
      likes: this.videoTestimonialData.likes,
      video: this.videoTestimonialData.video,
      rec_status: this.videoTestimonialData.rec_status,
      updatedempid: this.userData[0].employee_id
    }
    let modelClose = document.getElementById("CloseButton");
    this.service.editVideoTestmonials(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (this.videoTestimonialData.rec_status == '0') {
          this.videoTestimonials.splice(this.videoTestimonialData["index"], 1);
          this.toastyService.success(this.toastOptionsSuccess);
        }
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

  deleteVideoTestimonial(val, index) {
    this.deleteRecord = val
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    console.log(this.deleteRecord["testimonial_id"])
    this.service.editVideoTestmonials({ testimonial_id: this.deleteRecord["testimonial_id"], rec_status: 0 }).subscribe(res => {
      console.log(res.json())
      if (res.json().status == true) {
        this.videoTestimonials.splice(this.deleteRecord["index"], 1)
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

}