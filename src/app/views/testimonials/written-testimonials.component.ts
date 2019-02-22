import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestmonialsService } from '../../services/TestmonialsService';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
import { ToastMessageService } from '../../services/toast-message.service';

// such override allows to keep some initial values

@Component({
  templateUrl: 'written-testimonials.component.html',
  providers: [ToastMessageService]
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
  userData: any;
  deleteRecord = '';
  testimonialForm: FormGroup;
  submitted = false;
  copiedRow: '';
  URLquery: any;
  constructor(private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router, private service: TestmonialsService, private formBuilder: FormBuilder, private messageService: ToastMessageService, private completeService: CompleteBeautypassService) {
    this.URLquery = this.activeRoute.snapshot.queryParams;
  }
  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {

    if (this.URLquery.rating) {
      this.spinner.show();
      this.service.getWrittenTestmonials('?rating=3').subscribe(response => {
        this.spinner.hide();
        if (response["status"] == true) {
          this.testmonials = response["data"];
          // this.completeService.addWrittenTestmonials(response.json().data);
        } else {
          this.testmonials = [];
        }
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      });
    } else {
      this.spinner.show();
      this.service.getWrittenTestmonials('').subscribe(response => {
        this.spinner.hide();
        if (response["status"] == true) {
          this.testmonials = response["data"];
          // this.completeService.addWrittenTestmonials(response.json().data);
        } else {
          this.testmonials = [];
        }
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      });
    }


    this.cols = [
      { field: 'fullname', header: 'User Name' },
      { field: 'rating_1', header: 'Service Experience' },
      { field: 'rating_2', header: 'Ambiance' },
      { field: 'rating_3', header: 'Clieanliness' },
      { field: 'rating_4', header: 'Reception Service' },
      { field: 'rating_5', header: 'Overall Rating' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioName', header: 'Studio Name' },
      { field: 'empname', header: 'Updated Emp' },
      { field: 'recomment', header: 'User Comment' },
      { field: 'status', header: 'Status', type: 1 }
    ];

    this.testimonialForm = this.formBuilder.group({
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
      // studioName: this.testimonialData.studioName,
      // locationName: this.testimonialData.locationName,
      status: this.testimonialData.status,
      updatedempid: this.userData.data[0].employee_id
    }
    let modelClose = document.getElementById("CloseWritten");
    this.service.editWrittenTestmonials(data).subscribe(res => {
      modelClose.click();
      if (res["status"] == true) {
        if (this.testimonialData.coupons_status == '0') {
          this.testmonials[this.testimonialData["index"]] = res["data"];
          this.testmonials[this.testimonialData["index"]].locationName = this.testimonialData.locationName;
          this.testmonials[this.testimonialData["index"]].studioName = this.testimonialData.studioName;
          this.testmonials[this.testimonialData["index"]].fullname = this.testimonialData.fullname;
          this.testmonials[this.testimonialData["index"]].empname = this.userData.data[0].emp_firstname + " " + this.userData.data[0].emp_lastname;
          this.messageService.successToast("Written Testmonials inactive successfully")
        } else {
          this.testmonials[this.testimonialData["index"]] = res["data"];
          this.testmonials[this.testimonialData["index"]].locationName = this.testimonialData.locationName;
          this.testmonials[this.testimonialData["index"]].studioName = this.testimonialData.studioName
          this.messageService.successToast("Written Testmonials Updated successfully")
          this.testmonials[this.testimonialData["index"]].fullname = this.testimonialData.fullname;
          this.testmonials[this.testimonialData["index"]].empname = this.userData.data[0].emp_firstname + " " + this.userData.data[0].emp_lastname;
        }
      } else {
        this.messageService.errorToast("Written Testmonials not Updated ")
      }
    });
  }

  deleteTestimonial(val, index) {
    this.deleteRecord = val
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.editWrittenTestmonials({ testimonial_id: this.deleteRecord["testimonial_id"], status: 2 }).subscribe(res => {
      if (res["status"] == true) {
        // this.testmonials.splice(this.deleteRecord["index"], 1)
        // this.completeService.addWrittenTestmonials([]);
        this.messageService.successToast("Written Testmonials Deleted successfully")
      } else {
        this.messageService.errorToast("Written Testmonials not Updated ")
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    var url = '';
    this.URLquery = this.activeRoute.snapshot.queryParams;
    if (this.URLquery.rating) {
      url = '?rating=3';
    } else {
      url = '';
    }
    this.service.getWrittenTestmonials(url).subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.testmonials = response["data"];
        // this.completeService.addWrittenTestmonials(response.json().data);
      } else {
        this.testmonials = [];
      }
    });
  }

}