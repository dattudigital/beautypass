import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'mindbody-coupons.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ]
})

export class MindbodyCouponsComponent implements OnInit {
  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  couponsDetails: any = {
    'coupons_id': '',
    'coupons_number': '',
    'coupons_for': '',
    'createdempid': '',
    'coupons_status': '',
    'updatedempid': ''
  }
  couponsData: any;
  editData: any = [];
  deleteData: any = [];
  deleteRecord: ''
  userData: any;
  couponsForm: FormGroup;
  submitted = false;

  constructor(private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private router: Router, private service: RefferalRewardsService, sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getMindBodyCoupons().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.couponsData = response.json().data;
      }
      this.userData = JSON.parse(localStorage.getItem('loginDetails'));
      console.log(this.userData[0].employee_id);
    });

    this.couponsForm = this.formBuilder.group({
      Number: ['', Validators.required],
      Cost: ['', Validators.required]
    });

  }

  redirectToBulk(){
this.router.navigate(['mindbody-coupons/bulk'])
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

  editCoupons(data, index) {
    this.submitted = false;
    data.index = index;
    console.log(data.index);
    this.editData = data;
    console.log(this.editData)
  }

  get f() { return this.couponsForm.controls; }

  onSubmit() {
    this.updateCoupons(this.editData);
  }

  updateCoupons(val) {
    this.submitted = true;
    if (this.couponsForm.invalid) {
      return;
    }
    let element = document.getElementById("CloseButton");
    console.log(val)
    var data = {
      coupons_id: val.coupons_id,
      coupons_for: val.coupons_for,
      coupons_number: val.coupons_number,
      coupons_status: val.coupons_status,
      createdempid: this.userData[0].employee_id
    }
    this.service.addoreditMindBodyCoupons(data).subscribe();
    element.click();
  }


  deleteCoupons(val) {
    this.deleteRecord = val;
    console.log(this.deleteRecord)
    var data = {
      coupons_id: val.coupons_id,
      coupons_status: 0
    }
    this.deleteData = data;
  }

  deleteAlert() {
    this.service.addoreditMindBodyCoupons(this.deleteData).subscribe();
    this.couponsData = [];
    this.service.getMindBodyCoupons().subscribe(response => {
      this.couponsData = response.json().data;
    });
  }
  //   alertsDismiss: any = [];
  //   add(): void {
  //     this.alertsDismiss.push({
  //       type: 'info',
  //       msg: `Updated Sucessfully!`,
  //       timeout: 5000
  //     });
  //   }
  //   delete(): void {
  //     this.alertsDismiss.push({
  //       type: 'danger',
  //       msg: `Deleted Sucessfully!`,
  //       timeout: 5000
  //     });
  //   }
}