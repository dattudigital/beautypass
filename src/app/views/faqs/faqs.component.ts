import { Component, SecurityContext, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqsService } from '../../services/faqs.service';
declare var $: any;

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'faqs.component.html',
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
export class FaqsComponent implements OnInit {

 
  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  deleteData: { faq_id: any; faq_question: any; faq_answer: any; faq_status: number; };
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: FaqsService ,sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
   }
   ngOnInit() {
    this.spinner.show();
    this.service.getList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      this.spinner.hide();
    });
  
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
    this.editData = data;
    console.log(this.editData)
  }
  onSubmit() {
    //console.log(this.editData.tip_title);
    this.updatePromotion(this.editData);
  }
  updatePromotion(val) {
    let element = document.getElementById("CloseButton");
    let element1 = document.getElementById("CloseButtonCreate");
    if(val.faq_id){
      this.categorysData=[];
      this.add();
    }else{
      this.addCreate();
    }
    console.log(val)
    var data = {
      faq_id: val.faq_id,
      faq_question: val.faq_question,
      faq_answer: val.faq_answer,
      faq_status: 1
    }
    console.log(data)
    this.service.rgisterSubmit(data).subscribe();
    this.categorysData=[];
    this.service.getList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      element.click();
      element1.click();
    });
  }
  DeletePromotion(val) {
    console.log(val)
    var data = {
      faq_id: val.faq_id,
      faq_question: val.faq_question,
      faq_answer: val.faq_answer,
      faq_status:0
    }
    this.deleteData=data;
  }
  deleteAlert(){
    this.service.rgisterSubmit(this.deleteData).subscribe();
    this.delete();
    this.categorysData=[];
    this.service.getList().subscribe(response => {
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
