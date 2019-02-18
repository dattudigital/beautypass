import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeautyTipPipe } from '../../pipe/beauty-tip.pipe';
import { ToastMessageService } from '../../services/toast-message.service';
import { CompleteBeautypassService } from '../../services/complete-beautypass.service';

@Component({
  templateUrl: 'beautytip.component.html',
  providers: [
    BeautyTipPipe,
    ToastMessageService
  ]
})

export class BeautyTipsComponent implements OnInit {
  beautytips: any = {
    'tip_id': null,
    'tip_title': '',
    'tip_description': '',
    'tip_img': '',
    'tip_video': '',
    'tip_type': '',
    'profile_name': '',
    'rec_status': ''
  }
  beautyForm: FormGroup;
  submitted = false;
  tipsData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  totalItems: number;
  userimagePreview: any;
  userImage: string;
  _index: any;

  constructor(private spinner: NgxSpinnerService, private completeService: CompleteBeautypassService, private beautyTipPipe: BeautyTipPipe, private cdr: ChangeDetectorRef, private messageService: ToastMessageService, private formBuilder: FormBuilder, private service: BeautyTipsService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _beauty = this.completeService.getBeautyTip()
    if (Object.keys(_beauty).length) {
      this.tipsData = this.beautyTipPipe.transform(_beauty);
    } else {
      this.spinner.show();
      this.service.getBeautyTipsList().subscribe(response => {
        this.spinner.hide();
        if (response["status"] == true) {
          this.tipsData = this.beautyTipPipe.transform(response["data"]);
          this.completeService.addBeautyTip(response["data"])
        } else {
          this.tipsData = [];
        }
      });
    }

    this.beautyForm = this.formBuilder.group({
      description: ['', Validators.required],
      tipType: ['', Validators.required]
    });
  }

  get f() { return this.beautyForm.controls; }

  addOrUpdateBeautyTips() {
    this.submitted = true;
    if (!this.beautytips.tip_img) {
      this.beautytips.tip_img = null;
    }
    if (this.beautyForm.invalid) {
      return;
    }

    if (!this.beautytips.rec_status) {
      this.beautytips.rec_status = '1'
    }
    if (!this.beautytips.tip_id) {
      this.beautytips.tip_id = null;
    }
    var data = {
      tip_id: this.beautytips.tip_id,
      tip_title: this.beautytips.tip_title,
      tip_description: this.beautytips.tip_description,
      tip_img: this.beautytips.tip_img,
      tip_category: 1,
      profile_name: this.beautytips.profile_name,
      tip_video: this.beautytips.tip_video,
      tip_type: this.beautytips.tip_type,
      rec_status: this.beautytips.rec_status
    }
    if (this.beautytips.tip_img) {
      let modelClose = document.getElementById("CloseBeautyTip");
      this.spinner.show();
      this.service.AddOrEditBeautyTip(data).subscribe(res => {
        this.spinner.hide();
        modelClose.click();
        if (res["status"] == true) {
          if (!this.beautytips.tip_id) {
            this.tipsData.push(res["data"])
            this.completeService.addBeautyTip([])
            this.messageService.successToast("BeautyTip added Successfully")
          } else {
            this.tipsData[this._index] = res["data"];
            if (this.tipsData[this._index].tip_type == 2) {
              this.tipsData[this._index].tip_type = 'Hot Deal'
            }
            if (this.tipsData[this._index].tip_type == 1) {
              this.tipsData[this._index].tip_type = 'Beauty Tip'
            }
            this.completeService.addBeautyTip([])
            this.messageService.successToast("BeautyTip Updated Successfully")

          }
        } else {
          this.messageService.errorToast("BeautyTip not  Added")
        }
      })
    }
  }

  editBeautyTip(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.beautytips["index"] = index;
    this._index = ((this.currentPage - 1) * 3) + this.beautytips["index"]
    if (data.tip_type == "Beauty Tip") {
      data.tip_type = "1"
    }
    if (data.tip_type == "Hot Deal") {
      data.tip_type = "2"
    }
    this.beautytips = data;
  }

  backupData() {
    this.tipsData[this._index] = this.copiedRow;
  }

  deleteBeautyTips(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.spinner.show()
    this.service.DeleteBeautyTip(this.deleteRecord["tip_id"]).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
        this.tipsData.splice(_index, 1);
        this.completeService.addBeautyTip([])
        this.messageService.successToast("BeautyTip Deleted Successfully")
      } else {
        this.messageService.errorToast("BeautyTip not Deleted")
      }
    });
  }

  getFileDetails(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.beautytips.profile_name = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.beautytips.tip_img = btoa(binaryString);
    if (this.beautytips.tip_id) {
      this.isShowOriginalImg = true;
    }
  }

  removeFields() {
    this.submitted = false;
    this.beautytips.tip_id = '';
    this.beautytips.tip_title = '';
    this.beautytips.tip_description = '';
    this.userimagePreview = '';
    this.beautytips.tip_type = '';
    this.beautytips.tip_video = '';
    this.beautytips.rec_status = '';
    var inputElement = <HTMLInputElement>document.getElementById('uploadCaptureInputFile');
    inputElement.value = '';
  }

  reloadClick() {
    this.spinner.show();
    this.service.getBeautyTipsList().subscribe(response => {
      this.spinner.hide();
      if (response["status"] == true) {
        this.tipsData = this.beautyTipPipe.transform(response["data"]);
        this.completeService.addBeautyTip(response["data"])
      } else {
        this.tipsData = [];
      }
    });
  }

}
