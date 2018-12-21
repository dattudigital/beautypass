import { Component, SecurityContext, ViewEncapsulation,OnInit } from '@angular/core';
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
  templateUrl: 'perks.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class PerksComponent implements OnInit {

  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  perksForm: FormGroup;
  totalItems: number;
  categorysData: any;
  perksData: any = [];
  bigCurrentPage: number = 1;
  submitted = false;
  deleteData: { rewardpoint_id: any; rewardpoint_name: any; rewardpoint_amount: any; rewardpoint_status: number; };
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: RefferalRewardsService ,sanitizer: DomSanitizer,private formBuilder:FormBuilder) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
   }
   ngOnInit() {
    this.spinner.show();
    this.service.getPerksList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      this.spinner.hide();
    });
    this.perksForm = this.formBuilder.group({
      rewardName: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  removeFields(){
    this.submitted = false;
    this.perksData.rewardpoint_id = null;
    this.perksData.rewardpoint_name = '';
    this.perksData.rewardpoint_amount = '';
    this.perksData.rewardpoint_status = '';
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

  editPromotion(data, index) {
    data.index = index;
    this.perksData = data;
    console.log(this.perksData)
  }
  
  addOrUpdatePerk(){
    this.submitted = true;
  
    if (this.perksForm.invalid) {
      return;
    }

    if (!this.perksData.rewardpoint_id) {
      this.perksData.rewardpoint_status = '1'
    } else {
      this.perksData.rewardpoint_status = '0'
    }
  
    if (!this.perksData.rewardpoint_id) {
      this.perksData.rewardpoint_id = null;
    }

    var data = {
      rewardpoint_id: this.perksData.rewardpoint_id,
      rewardpoint_name: this.perksData.rewardpoint_name,
      rewardpoint_amount: this.perksData.rewardpoint_amount,
      rewardpoint_status: this.perksData.rewardpoint_status
    }
  }

  onSubmit() {
    //console.log(this.perksData.tip_title);
    this.updatePromotion(this.perksData);
  }
  
  get f() { return this.perksForm.controls; }
  
  updatePromotion(val) {
    let element = document.getElementById("CloseButton");
    let element1 = document.getElementById("CloseButtonCreate");
    if(val.rewardpoint_id){
     
      this.add();
    }else{
      this.addCreate();
    }
    console.log(val)
    var data = {
      rewardpoint_id: val.rewardpoint_id,
      rewardpoint_name: val.rewardpoint_name,
      rewardpoint_amount: val.rewardpoint_amount,
      rewardpoint_status: 1
    }
    console.log(data)
    this.service.editPerksList(data).subscribe();
    this.categorysData=[];
    this.service.getPerksList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      element.click();
      element1.click();
    });
  }
  DeletePromotion(val) {
    console.log(val)
    var data = {
      rewardpoint_id: val.rewardpoint_id,
      rewardpoint_name: val.rewardpoint_name,
      rewardpoint_amount: val.rewardpoint_amount,
      rewardpoint_status:0
    }
    this.deleteData=data;
  }
  deleteAlert(){
    this.service.editPerksList(this.deleteData).subscribe();
    this.delete();
    this.categorysData=[];
    this.service.getPerksList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData)
    });
  
  }
  alertsDismiss: any = [];
  add(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Updated Sucessfully!`,
      timeout: 5000
    });
  }
  addCreate(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Created Sucessfully!`,
      timeout: 5000
    });
  }
  delete(): void {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `Deleted Sucessfully!`,
      timeout: 5000
    });
  }
}
