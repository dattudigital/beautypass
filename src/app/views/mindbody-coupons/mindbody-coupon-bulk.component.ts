import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'mindbody-coupon-bulk.component.html',
})

export class MindbodyCouponsBulkComponent {
  empData: any;
  arrayBuffer: any;
  list: any = [];
  file: File;

  constructor(private service: RefferalRewardsService, private spinner: NgxSpinnerService, private router: Router) {
    this.empData = JSON.parse(localStorage.getItem('loginDetails'));
  }

  incomingfile(event) {
    this.file = event.target.files[0];
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

  addBulkCoupons() {
    this.list.forEach(element => {
      element.empid = this.empData[0].employee_id;
    });
    this.spinner.show();
    this.service.addoreditMindBodyCoupons(this.list).subscribe(res => {
      this.spinner.hide();
      this.router.navigate(['mindbody-coupons']);
    })
  }

}