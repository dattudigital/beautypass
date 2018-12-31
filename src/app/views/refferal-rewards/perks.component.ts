import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  templateUrl: 'perks.component.html',
  providers: [
    DatePipe
  ]
})

export class PerksComponent implements OnInit {
  toastOptionsSuccess: ToastOptions = {
    title: "Success",
    msg: "Successfully Done",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsError: ToastOptions = {
    title: "Error",
    msg: "Something is Wrong",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsWarn: ToastOptions = {
    title: "Not Found",
    msg: "No Data",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  perksForm: FormGroup;
  perk: any = [];
  perksData: any = [];
  submitted = false;
  cols: any = [];
  deleteRecord: '';
  copiedRow: '';
  constructor(private spinner: NgxSpinnerService, private toastyService: ToastyService, private dp: DatePipe, private service: RefferalRewardsService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getPerksList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.perk = response.json().data;
      } else {
        this.perk = [];
      }
    });

    this.cols = [
      { field: 'rewardpoint_name', header: 'Reward Point Name' },
      { field: 'rewardpoint_amount', header: 'Amount' },
      { field: 'rewardpoint_start_date', header: 'Start Date', type: this.dp },
      { field: 'rewardpoint_end_date', header: 'End Date', type: this.dp },
    ];


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

  get f() { return this.perksForm.controls; }

  addOrUpdatePerk() {
    this.submitted = true;

    if (this.perksForm.invalid) {
      return;
    }

    if (!this.perksData.rewardpoint_id) {
      this.perksData.rewardpoint_status = '1'
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
        if (!this.perksData.rewardpoint_id) {
          this.perk.push(res.json().data)
        } else {
          if (this.perksData.rewardpoint_status == '0') {
            this.perk.splice(this.perksData["index"], 1);
          } else {
            this.perk[this.perksData["index"]] = res.json().data;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    })
  }

  editPerk(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.perksData = data;
    this.perksData["index"] = index;
  }


  backupData() {
    let _index = this.perksData["index"];
    this.perk[_index] = this.copiedRow;
  }

  deletePerk(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.addOrEditPerksList({ rewardpoint_id: this.deleteRecord["rewardpoint_id"], rewardpoint_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        this.perk.splice(this.deleteRecord["index"], 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }
}
