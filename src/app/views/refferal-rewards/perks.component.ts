import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RefferalRewardsService } from '../../services/refferal-rewards.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastMessageService } from '../../services/toast-message.service';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';

@Component({
  templateUrl: 'perks.component.html',
  providers: [
    DatePipe
  ]
})

export class PerksComponent implements OnInit {
  perksForm: FormGroup;
  perk: any = [];
  perksData: any = [];
  submitted = false;
  cols: any = [];
  deleteRecord: '';
  copiedRow: '';

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private messageService: ToastMessageService, private dp: DatePipe, private service: RefferalRewardsService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let _perks = this.completeService.getPerksData()
    if (Object.keys(_perks).length) {
      this.perk = _perks;
    } else {
      this.spinner.show();
      this.service.getPerksList().subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.perk = response.json().data;
          this.completeService.addPerksData(response.json().data)
        } else {
          this.perk = [];
        }
      });
    }


    this.cols = [
      { field: 'rewardpoint_name', header: 'Reward Point Name' },
      { field: 'rewardpoint_amount', header: 'Amount' }
      // { field: 'rewardpoint_start_date', header: 'Start Date', type: this.dp },
      // { field: 'rewardpoint_end_date', header: 'End Date', type: this.dp },
    ];


    this.perksForm = this.formBuilder.group({
      rewardName: ['', Validators.required],
      rewardAmount: ['', Validators.required]
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

    let modelClose = document.getElementById("ClosePerks");
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
          if (JSON.parse(localStorage.getItem('perksData'))) {
            this.perk = JSON.parse(localStorage.getItem('perksData'))
          }
          this.perk.push(res.json().data);
          this.perk = this.perk.slice();
          this.completeService.addPerksData([]);
          this.messageService.successToast("Perks Added Successfully")
        } else {
          if (this.perksData.rewardpoint_status == '0') {
            this.perk.splice(this.perksData["index"], 1);
            this.perk = this.perk.slice();
            localStorage.setItem('perksData', JSON.stringify(this.perk))
            this.completeService.addPerksData([]);
            this.messageService.successToast("Perks Inactive Successfully")
          } else {
            this.perk[this.perksData["index"]] = res.json().data;
            this.completeService.addPerksData([]);
            this.messageService.successToast("Perks Updated Successfully")
          }
        }
      } else {
        this.messageService.errorToast("Perks not Successfully")
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
        this.completeService.addPerksData([]);
        localStorage.setItem('perksData', JSON.stringify(this.perk))

        this.messageService.successToast("Perks Deleted Successfully")
      } else {
        this.messageService.errorToast("Perks not Deleted")

      }
    });
  }

  reloadClick() {
    this.spinner.show();
    this.service.getPerksList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.perk = response.json().data;
        this.completeService.addPerksData(response.json().data)
      } else {
        this.perk = [];
      }
    });
  }

  only_allow_number(event) {
    var k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return (k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 0 || k == 36);
  }
}
