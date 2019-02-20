import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastMessageService } from '../../services/toast-message.service';
import { CouponsPipe } from '../../pipe/coupons.pipe';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
@Component({
  templateUrl: 'mindbody-coupons.component.html',
  providers: [
    DatePipe,
    CouponsPipe,
    ToastMessageService
  ]
})

export class MindbodyCouponsComponent implements OnInit {
  couponsDetails: any = {
    'coupons_id': '',
    'coupons_number': '',
    'coupons_for': '',
    'createdempid': '',
    'coupons_status': '',
    'updatedempid': ''
  }
  couponsData: any;
  deleteRecord: ''
  userData: any;
  couponsForm: FormGroup;
  submitted = false;
  cols: any = [];
  copiedRow: '';

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private cdr: ChangeDetectorRef, private messageService: ToastMessageService, private dp: DatePipe, private router: Router, private formBuilder: FormBuilder, private service: RefferalRewardsService) { }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _coupons = this.completeService.getCoupons()
    if (Object.keys(_coupons).length) {
      this.couponsData = _coupons;
    } else {
      this.spinner.show();
      this.service.getMindBodyCoupons().subscribe(response => {
        this.spinner.hide();
        if (response["status"] == true) {
          this.couponsData = response["data"];
          this.completeService.addCoupons(this.couponsData)
        } else {
          this.couponsData = [];
        }
        this.userData = JSON.parse(localStorage.getItem('loginDetails'));
        console.log(this.userData.data[0].employee_id)
      });
    }

    this.couponsForm = this.formBuilder.group({
      Number: ['', Validators.required],
      Cost: ['', Validators.required]
    });

    this.cols = [
      { field: 'coupons_number', header: 'Coupon Number' },
      { field: 'coupons_for', header: 'Cost' },
      { field: 'coupons_status', header: 'Status', type: 1 },
    ];
  }

  redirectToBulk() {
    this.router.navigate(['mindbody-coupons/bulk'])
  }

  editCoupons(data, index) {
    // if (data.coupons_status) {
    //   data.coupons_status = '1';
    // }
    this.copiedRow = Object.assign({}, data);
    this.couponsDetails = data;
    this.couponsDetails["index"] = index;
  }

  backupData() {
    let _index = this.couponsDetails["index"];
    this.couponsData[_index] = this.copiedRow;
    // if (this.couponsData[_index].coupons_status) {
    //   this.couponsData[_index].coupons_status = "Active"
    // }
  }

  get f() { return this.couponsForm.controls; }

  updateCoupons() {
    this.submitted = true;
    if (this.couponsForm.invalid) {
      return;
    }

    var data: any = {
      coupons_id: this.couponsDetails.coupons_id,
      coupons_for: this.couponsDetails.coupons_for,
      coupons_number: this.couponsDetails.coupons_number,
      coupons_status: this.couponsDetails.coupons_status
    }
    if (!this.couponsDetails.coupons_id) {
      data.createdempid = this.userData.data[0].employee_id;
    } else {
      data.updatedempid = this.userData.data[0].employee_id;
    }
    let modelClose = document.getElementById("CloseButton");
    this.spinner.show();
    this.service.addoreditMindBodyCoupons(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res["status"] == true) {
        if (this.couponsDetails.coupons_status == '0') {
          // this.couponsData.splice(this.couponsDetails["index"], 1);
          this.couponsData[this.couponsDetails["index"]].coupons_status = "0";
          this.completeService.addCoupons([]);
          this.messageService.successToast("Coupons Inactive Successfully")
        } else {
          this.couponsData[this.couponsDetails["index"]] = res["data"];
          this.completeService.addCoupons([]);
          // if (this.couponsData[this.couponsDetails["index"]].coupons_status) {
          //   this.couponsData[this.couponsDetails["index"]].coupons_status = 'active'
          // }
          this.messageService.successToast("Coupons Updated Successfully")
        }
      } else {
        this.messageService.errorToast("Coupons Not Updated")
      }
    });
  }

  deleteCoupons(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.spinner.show();
    this.service.deleteMindBodyCoupons(this.deleteRecord["coupons_id"]).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.couponsData.splice(this.deleteRecord["index"], 1);
        this.completeService.addCoupons([]);
        this.messageService.successToast("Coupons Deleted Successfully")
      } else {
        this.messageService.errorToast("Coupons Not Deleted")
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getMindBodyCoupons().subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.couponsData = response["data"];
        this.completeService.addCoupons(this.couponsData)
      }
    });
  }
}