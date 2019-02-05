import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private router: Router, private service: TestmonialsService, private formBuilder: FormBuilder, private messageService: ToastMessageService, private completeService: CompleteBeautypassService) { }
  backToDashBoard() {
    this.router.navigate(['reports'])
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _written = this.completeService.getWrittenTestmonials()
    if (Object.keys(_written).length) {
      this.testmonials = _written;
    } else {
      this.spinner.show();
      this.service.getWrittenTestmonials().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.testmonials = response.json().data;
          this.completeService.addWrittenTestmonials(response.json().data);
        } else {
          this.testmonials = [];
        }
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      });
    }

    this.cols = [
      { field: 'fullname', header: 'User Name' },
      { field: 'rating_1', header: 'Rating 1' },
      { field: 'rating_2', header: 'Rating 2' },
      { field: 'rating_3', header: 'Rating 3' },
      { field: 'rating_4', header: 'Rating 4' },
      { field: 'rating_5', header: 'Rating 5' },
      { field: 'locationName', header: 'Location Name' },
      { field: 'studioName', header: 'Studio Name' },
      { field: 'empname', header: 'Updated Emp' },
      { field: 'comments', header: 'Description' },
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
    console.log(this.testimonialData)
    console.log(this.testimonialData.studioName)
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
      updatedempid: this.userData.employee_id
    }
    console.log(data);
    let modelClose = document.getElementById("CloseWritten");
    this.service.editWrittenTestmonials(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        console.log(this.testimonialData.coupons_status)
        if (this.testimonialData.coupons_status == '0') {
          // this.testmonials.splice(this.testimonialData["index"], 1);
          this.completeService.addWrittenTestmonials(this.testmonials);
          this.messageService.successToast("Written Testmonials inactive successfully")
        } else {
          console.log(res.json().data)
          this.testmonials[this.testimonialData["index"]] = res.json().data;
          this.testmonials[this.testimonialData["index"]].locationName = this.testimonialData.locationName;
          this.testmonials[this.testimonialData["index"]].studioName = this.testimonialData.studioName

          this.completeService.addWrittenTestmonials(this.testmonials);

          this.messageService.successToast("Written Testmonials Updated successfully")
          this.testmonials[this.testimonialData["index"]].fullname = this.testimonialData.fullname;
          this.testmonials[this.testimonialData["index"]].empname = this.userData.emp_firstname + " " + this.userData.emp_lastname;
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
    this.service.editWrittenTestmonials({ testimonial_id: this.deleteRecord["testimonial_id"], status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        // this.testmonials.splice(this.deleteRecord["index"], 1)
        this.completeService.addWrittenTestmonials(this.testmonials);
        this.messageService.successToast("Written Testmonials Deleted successfully")
      } else {
        this.messageService.errorToast("Written Testmonials not Updated ")
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getWrittenTestmonials().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.testmonials = response.json().data;
        this.completeService.addWrittenTestmonials(response.json().data);
      } else {
        this.testmonials = [];
      }
    });
  }

}