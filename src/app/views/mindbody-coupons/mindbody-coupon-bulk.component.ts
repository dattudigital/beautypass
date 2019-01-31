import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastMessageService } from '../../services/toast-message.service';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';
@Component({
  templateUrl: 'mindbody-coupon-bulk.component.html',
  providers: [
    ToastMessageService
  ]
})

export class MindbodyCouponsBulkComponent {
  empData: any;
  arrayBuffer: any;
  list: any = [];
  file: File;
  cols: any = [];
  uploadStyle = 'hidden'

  constructor(private service: RefferalRewardsService, private completeService: CompleteBeautypassService, private messageService: ToastMessageService, private spinner: NgxSpinnerService, private router: Router) {
    if (localStorage.loginDetails) {
      this.empData = JSON.parse(localStorage.getItem('loginDetails'));
    }

    this.cols = [
      { field: 'coupon num', header: 'Coupon Number' },
      { field: 'coupon point', header: 'Cost' }
    ];
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.uploadStyle = 'visible'
  }

  redirectToCoupons() {
    this.router.navigate(['mindbody-coupons']);
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.list = XLSX.utils.sheet_to_json(worksheet, { raw: false })
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  errorData: any = [];
  addBulkCoupons() {
    this.list.forEach(element => {
      element.empid = this.empData.employee_id;
    });
    // coupon point  ,   coupon num
    this.spinner.show();
    this.service.addBulkMindBodyCoupons(this.list).subscribe(res => {
      this.spinner.hide();

      if (Object.keys(res.json().errdata).length > 0) {

        this.errorData = res.json().errdata;
        this.messageService.errorToast("Already Coupons Exists")
      } else {
        this.router.navigate(['mindbody-coupons']);
        this.completeService.addCoupons([]);
      }
    })
  }

}