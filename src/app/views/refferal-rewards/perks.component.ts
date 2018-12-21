import { Component, ChangeDetectorRef, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
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

  perksForm: FormGroup;
  Perk: any;
  perksData: any = [];
  currentPageIndex: number = 1;
  submitted = false;
  deleteData: { rewardpoint_id: any; rewardpoint_status: number; };
  
  constructor(private spinner: NgxSpinnerService, private router: Router, private service: RefferalRewardsService, sanitizer: DomSanitizer, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
   
  }
  
  ngOnInit() {
    this.spinner.show();
    this.service.getPerksList().subscribe(response => {
      this.Perk = response.json().data;
      console.log(this.Perk);
      this.spinner.hide();
    });
    this.perksForm = this.formBuilder.group({
      rewardName: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  removeFields() {
    this.submitted = false;
    this.perksData.rewardpoint_id = null;
    this.perksData.rewardpoint_name = '';
    this.perksData.rewardpoint_amount = '';
    this.perksData.rewardpoint_status = '';
  }

  editPerk(data, index) {
    data.index = index;
    this.perksData = data;
    console.log(this.perksData)
  }

  addOrUpdatePerk() {
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

    let modelClose = document.getElementById("CloseButton");
    var data = {
      rewardpoint_id: this.perksData.rewardpoint_id,
      rewardpoint_name: this.perksData.rewardpoint_name,
      rewardpoint_amount: this.perksData.rewardpoint_amount,
      rewardpoint_status: this.perksData.rewardpoint_status
    }
    this.spinner.show();
    this.service.addOrEditPerksList(data).subscribe(res => {
      this.spinner.hide();
      modelClose.click();
      if (res.json().status == true) {
        this.Perk.push(res.json().data)
      }
    })
  }

  get f() { return this.perksForm.controls; }

  deletePerk(val) {
    console.log(val)
    var data = {
      rewardpoint_id: this.perksData.rewardpoint_id,     
      rewardpoint_status: 0
    }
    this.deleteData = data;
    this.spinner.show();
    let deleteButton = document.getElementById("deleteCloseButton");
    console.log(this.currentPageIndex)
    console.log(this.perksData)
    let rowIndex = ( ( this.currentPageIndex - 1 ) * 10 ) + (this.perksData.index);
    console.log(rowIndex)
    this.service.addOrEditPerksList(data).subscribe(res => {
      this.Perk.splice(rowIndex,1)
      deleteButton.click();
      this.spinner.hide();           
    })
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
