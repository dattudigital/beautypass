import { Component, ChangeDetectorRef, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqsService } from '../../services/faqs.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessageService } from '../../services/toast-message.service';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';

@Component({
  templateUrl: 'faqs.component.html',
  providers: [ToastMessageService]
})

export class FaqsComponent implements OnInit {
  faqData: any;
  copiedRow: any;
  faqsForm: FormGroup;
  faqs: any = {
    'faq_id': null,
    'faq_question': '',
    'faq_answer': '',
    'faq_status': ''
  }
  submitted = false;
  cols: any = [];
  deleteRecord = '';

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private messageService: ToastMessageService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private service: FaqsService) { }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _faq = this.completeService.getFaqs()
    if (Object.keys(_faq).length) {
      this.faqData = _faq;
    } else {
      this.spinner.show();
      this.service.getList().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.faqData = response.json().data;
          this.completeService.addFaqs(response.json().data);
        } else {
          this.faqData = [];
        }
      });
    }

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
    }
    if (!this.faqs.faq_id) {
      this.faqs.faq_id = null;
    }
    var data = {
      faq_id: this.faqs.faq_id,
      faq_question: this.faqs.faq_question,
      faq_answer: this.faqs.faq_answer,
      faq_status: this.faqs.faq_status
    }
    let modelClose = document.getElementById("CloseFaqs");
    this.spinner.show()
    this.service.addOrUpdateFaq(data).subscribe(res => {
      this.spinner.hide()
      modelClose.click();
      if (res.json().status == true) {
        if (!this.faqs.faq_id) {
          if (JSON.parse(localStorage.getItem('faq'))) {
            this.faqData = JSON.parse(localStorage.getItem('faq'))
          }
          this.faqData.push(res.json().data);
          this.faqData = this.faqData.slice();
          this.completeService.addFaqs([]);
          this.messageService.successToast("Faq Added Successfully")
        } else {
          if (this.faqs.faq_status == '0') {
            this.faqData.splice(this.faqs["index"], 1);
            this.faqData = this.faqData.slice();
            localStorage.setItem('faq', JSON.stringify(this.faqData))
            this.completeService.addFaqs([]);
            this.messageService.successToast("Faq Inactive Successfully")
          } else {
            this.faqData[this.faqs["index"]] = res.json().data;
            this.completeService.addFaqs([]);
            this.messageService.successToast("Faq Updated Successfully")
          }
        }
      } else {
        this.messageService.errorToast("Faq is not added")
      }
    });
  }

  editFaqs(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.faqs = data;
    this.faqs["index"] = index;
  }
  backupData() {
    let _index = this.faqs["index"];
    this.faqData[_index] = this.copiedRow;
  }
  deleteFaqs(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.spinner.show()
    this.service.deleteFaq(this.deleteRecord["faq_id"]).subscribe(res => {
      this.spinner.hide()
      if (res.json().status == true) {
        this.faqData.splice(this.deleteRecord["index"], 1);
        this.completeService.addFaqs([]);
        localStorage.setItem('faq', JSON.stringify(this.faqData))
        this.messageService.successToast("Faq Deleted Successfully")
      } else {
        this.messageService.errorToast("Faq is not Deleted")
      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.faqData = response.json().data;
        this.completeService.addFaqs(response.json().data);
      } else {
        this.faqData = [];
      }
    });
  }

}
