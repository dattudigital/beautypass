import { Component, ChangeDetectorRef, SecurityContext, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqsService } from '../../services/faqs.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  faqData: any;
  editData: any = [];
  deleteData: any = [];
  deleteRecord = '';
  faqsForm: FormGroup;
  faqs: any = {
    'faq_id': null,
    'faq_question': '',
    'faq_answer': '',
    'faq_status': ''
  }
  submitted = false;


  constructor(private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private router: Router, private service: FaqsService, sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.faqData = response.json().data;
        console.log(this.faqData);
      } else {
        this.faqData = [];
      }
    });

    this.faqsForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer: ['', Validators.required]
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

  removeFields() {
    this.submitted = false;
    this.faqs.faq_id = '',
      this.faqs.faq_question = '',
      this.faqs.faq_answer = '',
      this.faqs.faq_status = ''
  }

  get f() { return this.faqsForm.controls; }

  addFaqs() {
    this.submitted = true;
    if (this.faqsForm.invalid) {
      return;
    }

    if (!this.faqs.faq_id) {
      this.faqs.faq_status = '1'
    } else {
      this.faqs.faq_status = '0'
    }
    console.log(this.faqs.faq_id)
    if (!this.faqs.faq_id) {
      this.faqs.faq_id = null;
    }
    var data = {
      faq_id: this.faqs.faq_id,
      faq_question: this.faqs.faq_question,
      faq_answer: this.faqs.faq_answer,
      faq_status: this.faqs.faq_status
    }
    let modelClose = document.getElementById("CloseButton");
    this.service.addOrUpdateFaq(data).subscribe(res => {
      modelClose.click();
      if(res.json().status == true){
        this.faqData.push(res.json().data)
      }
    });
  }

  editFaqs(data, index) {
    data.index = index;
    this.faqs = data;
  }

  DeleteFaqs(val) {
    this.deleteRecord = val
    var data = {
      faq_id: val.faq_id,
      faq_status: 0
    }
    this.deleteData = data;
  }

  deleteAlert() {
    this.service.addOrUpdateFaq(this.deleteData).subscribe();
    this.delete();
    this.faqData = [];
    this.service.getList().subscribe(response => {
      this.faqData = response.json().data;
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
