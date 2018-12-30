import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'beautytip.component.html'
})

export class BeautyTipsComponent implements OnInit {

  beautytips: any = {
    'tip_id': '',
    'tip_title': '',
    'tip_description': '',
    'tip_img': '',
    'tip_video': '',
    'profile_name': '',
    'rec_status': ''
  }

  isShowOriginalImg: boolean = false;
  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  url: any;
  currentImage: any = '';
  // bankuploadedFiles: any;
  // myFiles: string[] = [];
  // bankstmtImage: number = 0;
  // data = [];
  uploadedFiles: any[] = [];
  userImageName = '';
  userimagePreview: any;
  userImage: string;
  // hideModal = false;  
  deleteData: { tip_id: any; tip_title: any; tip_description: any; profile_name: any; rec_status: number; };
  // alertMessageValue: boolean;
  // validBtn: boolean;
  // userData: any;
  // model: any = {};

  constructor(private spinner: NgxSpinnerService, private service: BeautyTipsService) {

  }

  ngOnInit() {
    this.spinner.show();
    this.service.getBeautyTipsList().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.categorysData = response.json().data;
        console.log(this.categorysData);
      } else {
        this.categorysData = [];
      }
    });

    // if(localStorage.loginDetails){
    //   this.userData=JSON.parse(localStorage.getItem('loginDetails'));
    //   console.log(this.userData[0].employee_id);
    // }
  }

  addOrUpdateBeautyTips() {
    if (!this.beautytips.rec_status) {
      this.beautytips.rec_status = '1'
    } else {
      this.beautytips.rec_status = '0'
    }
    console.log(this.beautytips.tip_id)
    if (!this.beautytips.tip_id) {
      console.log('@@@@@@@@')
      this.beautytips.tip_id = null;
    }
    console.log(this.beautytips.tip_id)
    var data = {
      tip_id: this.beautytips.tip_id,
      tip_title: this.beautytips.tip_title,
      tip_description: this.beautytips.tip_description,
      tip_img: this.beautytips.tip_img,
      tip_category: 1,
      profile_name: this.beautytips.profile_name,
      rec_status: this.beautytips.rec_status
    }
    console.log(data);
    this.service.AddOrEditBeautyTip(data).subscribe(res => {
      console.log(res.json())
    })
  }

  editBeautyTip(data, index) {
    this.beautytips = data;
    console.log(this.beautytips)
    console.log(this.beautytips.tip_img)
    // this.userimagePreview = this.beautytips.tip_img
  }

  removeFields() {
    this.beautytips.tip_id = '';
    this.beautytips.tip_title = '';
    this.beautytips.tip_description = '';
    this.beautytips.tip_img = '';
    this.userimagePreview = '';
  }

  // clearData() {
  //   this.editData = [];
  //   this.userimagePreview = '';
  //   this.userImageName = '';
  //   this.userImage = '';
  // }
  editPromotion(data, index) {
    this.userimagePreview = '';
    this.editData = data;
    console.log(this.editData)
  }

  // updatePromotion(val) {
  //   let element = document.getElementById("CloseButton");
  //   console.log(val)
  //   var data = {
  //     tip_id: val.tip_id,
  //     tip_title: val.tip_title,
  //     tip_description: val.tip_description,
  //     tip_img: this.userImage,
  //     tip_category: 1,
  //     profile_name: this.userImageName,
  //     rec_status: val.rec_status
  //   }
  //   if (!data.tip_id) {
  //     this.addCreate();
  //   }
  //   this.service.editBeautyTip(data).subscribe();

  //   element.click();
  //   this.categorysData = [];
  //   this.service.getBeautyTipsList().subscribe(response => {
  //     this.categorysData = response.json().data;
  //     console.log(this.categorysData);
  //     //this.addCreate();
  //   });
  // }
  DeletePromotion(val) {
    console.log(val)
    var data = {
      tip_id: val.tip_id,
      tip_title: val.tip_title,
      tip_description: val.tip_description,
      profile_name: val.profile_name,
      rec_status: 0
    }
    this.deleteData = data;
  }
  // deleteAlert() {
  //   this.service.editBeautyTip(this.deleteData).subscribe();
  //   this.delete();
  //   this.categorysData = [];
  //   this.service.getBeautyTipsList().subscribe(response => {
  //     this.categorysData = response.json().data;
  //     console.log(this.categorysData)
  //   });

  // }

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
      this.userImageName = file.name;
      console.log(this.userImageName);
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }
  //image base64 format
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.userImage = btoa(binaryString);
    this.currentImage = ''
    if (this.beautytips.tip_id) {
      this.isShowOriginalImg = true;
    }
  }
}
