import { Component, ChangeDetectorRef, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqsService } from '../../services/faqs.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: 'faqs.component.html',
})

export class FaqsComponent implements OnInit {
  faqData: any;
  editData: any = [];
  deleteData: any = [];
  deleteRecordFaq = '';
  faqsForm: FormGroup;
  faqs: any = {
    'faq_id': null,
    'faq_question': '',
    'faq_answer': '',
    'faq_status': ''
  }
  submitted = false;
  cols: any = [];

  constructor(private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private service: FaqsService) { }

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

    this.cols = [
      { field: 'faq_question', header: 'Question' },
      { field: 'faq_answer', header: 'Answer' },
    ]

    this.faqsForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer: ['', Validators.required]
    });
  }

  removeFields() {
    this.submitted = false;
    this.faqs.faq_id = '';
    this.faqs.faq_question = '';
    this.faqs.faq_answer = '';
    this.faqs.faq_status = '';
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
      if (res.json().status == true) {
        this.faqData.push(res.json().data)
      }
    });
  }

  editFaqs(data, index) {
    data.index = index;
    this.faqs = data;
  }

  DeleteFaqs(val) {
    this.deleteRecordFaq = val
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
