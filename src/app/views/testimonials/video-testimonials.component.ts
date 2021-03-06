import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestmonialsService } from "../../services/TestmonialsService";
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
import { ToastMessageService } from '../../services/toast-message.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;

@Component({
  templateUrl: 'video-testimonials.component.html',
  providers: [ToastMessageService]
})

export class VideoTestimonialsComponent {
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

  constructor(private spinner: NgxSpinnerService, private router: Router, private service: TestmonialsService, private messageService: ToastMessageService, private completeService: CompleteBeautypassService, private formBuilder: FormBuilder) {
  }

  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngOnInit() {
    let _video = this.completeService.getVideoTestmonials()
    if (Object.keys(_video).length) {
      this.videoTestimonials = _video;
    } else {
      this.spinner.show();
      this.service.getVideoTestmonials().subscribe(response => {
        this.spinner.hide();
        if (response["status"] == true) {
          this.videoTestimonials = response["data"];
          console.log(this.videoTestimonials)
          this.completeService.addVideoTestmonials(this.videoTestimonials);
        } else {
          this.videoTestimonials = [];
        }
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
        console.log(this.userData.data[0].employee_id)
      });
    }

    this.cols = [
      { field: 'fullname', header: 'Username' },
      { field: 'description', header: 'Description' },
      { field: 'likes', header: 'Likes' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioName', header: 'Studio Name' },
      { field: 'empname', header: 'Updated Emp' },
      { field: 'description', header: 'Description' },
      { field: 'rec_status', header: 'Status', type: 1 }
    ];

    this.videoTestimonialForm = this.formBuilder.group({
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
      updatedempid: this.userData.data[0].employee_id
    }
    let modelClose = document.getElementById("CloseVideo");
    this.service.editVideoTestmonials(data).subscribe(res => {
      modelClose.click();
      if (res["status"] == true) {
        if (this.videoTestimonialData.rec_status == '0') {
          this.videoTestimonials[this.videoTestimonialData["index"]].rec_status = "0";
          this.videoTestimonials[this.videoTestimonialData["index"]] = res["data"];
          this.completeService.addVideoTestmonials([]);
          this.messageService.successToast("Video Testmonials inactive successfully")
          this.videoTestimonials[this.videoTestimonialData["index"]].fullname = this.videoTestimonialData.fullname;
          this.videoTestimonials[this.videoTestimonialData["index"]].empname = this.userData.data[0].emp_firstname + " " + this.userData.data[0].emp_lastname;
          this.videoTestimonials[this.videoTestimonialData["index"]].studioName = this.videoTestimonialData.studioName;
          this.videoTestimonials[this.videoTestimonialData["index"]].locationName = this.videoTestimonialData.locationName;
        } else {
          this.videoTestimonials[this.videoTestimonialData["index"]] = res["data"];
          this.completeService.addVideoTestmonials([]);
          this.messageService.successToast("Video Testmonials Updated successfully")
          this.videoTestimonials[this.videoTestimonialData["index"]].fullname = this.videoTestimonialData.fullname;
          this.videoTestimonials[this.videoTestimonialData["index"]].empname = this.userData.data[0].emp_firstname + " " + this.userData.data[0].emp_lastname;
          this.videoTestimonials[this.videoTestimonialData["index"]].studioName = this.videoTestimonialData.studioName;
          this.videoTestimonials[this.videoTestimonialData["index"]].locationName = this.videoTestimonialData.locationName;
        }
      } else {
        this.messageService.errorToast("Video Testmonials not Updated ")
      }
    });
  }

  deleteVideoTestimonial(val, index) {
    this.deleteRecord = val
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.editVideoTestmonials({ testimonial_id: this.deleteRecord["testimonial_id"], rec_status: 2 }).subscribe(res => {
      if (res["status"] == true) {
        // this.videoTestimonials.splice(this.deleteRecord["index"], 1)
        this.completeService.addVideoTestmonials([]);
        this.messageService.successToast("Video Testmonials Deleted successfully")
      } else {
        this.messageService.errorToast("Video Testmonials not Updated ")
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getVideoTestmonials().subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.videoTestimonials = response["data"];
        this.completeService.addVideoTestmonials(response["data"]);
      } else {
        this.videoTestimonials = [];
      }
    });
  }

}